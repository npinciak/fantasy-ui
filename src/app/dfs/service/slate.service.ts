import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { camelCase } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import {
  ClientSlateAttributes,
  ClientSlatePlayerAttributes,
  ClientSlatePlayerAttributesMap,
  ClientSlateStatGroups,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
} from '../models/daily-fantasy-client-slate-attr.model';
import { SlateMaster, Vegas } from '../models/daily-fantasy-client.model';
import { Team } from '../models/team.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam, RestEntity } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';
import { PlayerProfilerEntityMap, PlayerProfilerTimeframeMap } from '../nfl/models/nfl-profiler.model';
import { OutsidersProps, ScheduleAdjFptsProps } from '../nfl/models/nfl-slate-attr.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  constructor(private apiService: ApiService) {}

  static isNFL(team: ClientSlateTeamAttributes): team is NFLClientSlateAttrTeam {
    return 'safpts' in team;
  }

  static isNFLStatGroup(statGroup: ClientSlateStatGroups): statGroup is NFLClientStatGroup {
    return 'qb' in statGroup;
  }

  static isNFLPlayer(player: ClientSlatePlayerAttributes): player is NFLClientPlayerAttributes {
    return 'ecr' in player;
  }

  static isNBA(team: ClientSlateTeamAttributes): team is NBAClientSlateAttrTeam {
    return 'rest' in team;
  }

  static isNBAPlayer(player: ClientSlatePlayerAttributes): player is NBAClientPlayerAttributes {
    return 'dvp' in player;
  }

  static transformStatGroupsToProfiler(statGroup: ClientSlateStatGroups): PlayerProfilerEntityMap {
    if (SlateService.isNFLStatGroup(statGroup)) {
      const qb = <PlayerProfilerTimeframeMap>{};
      for (const prop in statGroup.qb.profiler.season) {
        qb.season[camelCase(prop)] = statGroup.qb.profiler.season[prop];
        qb.lastSeason[camelCase(prop)] = statGroup.qb.profiler['last-season'][prop];
        qb.combined[camelCase(prop)] = statGroup.qb.profiler.combined[prop];
      }

      const rb = <PlayerProfilerTimeframeMap>{};
      for (const prop in statGroup.rb.profiler.season) {
        rb.season[camelCase(prop)] = statGroup.rb.profiler.season[prop];
        rb.lastSeason[camelCase(prop)] = statGroup.rb.profiler['last-season'][prop];
        rb.combined[camelCase(prop)] = statGroup.rb.profiler.combined[prop];
      }

      const wr = <PlayerProfilerTimeframeMap>{};
      for (const prop in statGroup.wr.profiler.season) {
        wr.season[camelCase(prop)] = statGroup.wr.profiler.season[prop];
        wr.lastSeason[camelCase(prop)] = statGroup.wr.profiler['last-season'][prop];
        wr.combined[camelCase(prop)] = statGroup.wr.profiler.combined[prop];
      }

      const te = <PlayerProfilerTimeframeMap>{};
      for (const prop in statGroup.te.profiler.season) {
        te.season[camelCase(prop)] = statGroup.te.profiler.season[prop];
        te.lastSeason[camelCase(prop)] = statGroup.te.profiler['last-season'][prop];
        te.combined[camelCase(prop)] = statGroup.te.profiler.combined[prop];
      }

      return {
        qb,
        rb,
        te,
        wr,
      };
    }
  }

  static transform(teamAttributes: ClientSlateTeamAttributes) {
    if (SlateService.isNFL(teamAttributes)) {
      const safpts = <ScheduleAdjFptsProps>{};
      for (const prop in teamAttributes.safpts) {
        safpts[camelCase(prop)] = teamAttributes.safpts[prop];
      }

      const outsiders = <OutsidersProps>{};
      for (const prop in teamAttributes.safpts) {
        outsiders[camelCase(prop)] = teamAttributes.outsiders[prop];
      }

      return {
        safpts,
        outsiders,
      };
    }

    if (SlateService.isNBA(teamAttributes)) {
      return {
        rest: teamAttributes.rest,
      };
    }
  }

  static transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap) {
    return Object.entries(teams).map(([id, team]) => ({
      id: id,
      vegas: team.vegas,
      outsiders: SlateService.transform(team).outsiders ?? null,
      safpts: SlateService.transform(team).safpts ?? null,
      rest: SlateService.transform(team).rest ?? null,
    }));
  }

  static transformStatGroupSlateAttributes(statGroup: NFLClientStatGroup) {
    return SlateService.transformStatGroupsToProfiler(statGroup);
  }

  static transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap) {
    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff ?? null,
      slateOwn: player.slate_ownership ?? null,
      ownership: player.ownership ?? null,
      value: player.value_pct ?? null,
      smash: player.smash_pct ?? null,
      expertRanking: null, // SlateService.isNFLPlayer(player),
      defenseVsPos: null, // NBA SlateService.isNBAPlayer(player) ?? null,
    }));
  }

  slatesByDate(request: { sport: string }): Observable<SlateMaster> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);
    return this.apiService.get<SlateMaster>(endpoint.slateMaster);
  }

  getGameAttrBySlateId(request: { sport: string; site: string; slateId: string }): Observable<SlateAttributes> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);

    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slateId);
    return this.apiService.get<ClientSlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => ({
        teams: SlateService.transformTeamSlateAttributes(res.teams),
        statGroups: SlateService.transformStatGroupSlateAttributes(res.stat_groups),
        players: SlateService.transformPlayerSlateAttributes(res.players),
      }))
    );
  }
}

export type SlateTeam = Pick<Team, 'id'> & { vegas: Vegas } & Partial<{
    outsiders: OutsidersProps | null;
    safpts: ScheduleAdjFptsProps | null;
    rest: RestEntity | null;
  }>;

export type SlateTeamMap = Record<string, SlateTeam>;

type SlateAttributes = {
  teams: SlateTeam[];
  players: unknown[];
  statGroups: PlayerProfilerEntityMap;
};
