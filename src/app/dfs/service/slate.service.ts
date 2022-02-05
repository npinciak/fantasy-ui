import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { objectIsEmpty, transformPercToNumber } from '@app/@shared/helpers/utils';
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
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { Team } from '../models/team.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam, RestEntity } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';
import { PlayerProfilerSeason, PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
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

  static transform(teamAttributes: ClientSlateTeamAttributes) {
    if (SlateService.isNFL(teamAttributes)) {
      const safpts = {} as ScheduleAdjFptsProps;
      for (const prop in teamAttributes.safpts) {
        if (teamAttributes.safpts.hasOwnProperty(prop)) {
          safpts[camelCase(prop)] = teamAttributes.safpts[prop];
        }
      }

      const outsiders = {} as OutsidersProps;
      for (const prop in teamAttributes.outsiders) {
        if (teamAttributes.outsiders.hasOwnProperty(prop)) {
          outsiders[camelCase(prop)] = teamAttributes.outsiders[prop];
        }
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
    if (objectIsEmpty(teams)) {
      return [];
    }
    return Object.entries(teams).map(([id, team]) => ({
      id,
      vegas: team.vegas,
      outsiders: SlateService.transform(team).outsiders ?? null,
      safpts: SlateService.transform(team).safpts ?? null,
      rest: SlateService.transform(team).rest ?? null,
    }));
  }

  static transformStatGroupsToProfiler(statGroup: ClientSlateStatGroups): PlayerProfilerSeasonMap | null | undefined {
    if (objectIsEmpty(statGroup)) {
      return {};
    }
    const qb = {} as PlayerProfilerSeason;
    for (const prop in statGroup.qb.profiler.season) {
      qb.season[camelCase(prop)] = Number(statGroup.qb.profiler.season[prop]);
      // qb.lastSeason[camelCase(prop)] = Number(statGroup.qb.profiler['last-season'][prop]);
      //  qb.combined[camelCase(prop)] = Number(statGroup.qb.profiler.combined[prop]);
    }

    const rb = {} as PlayerProfilerSeason;
    for (const prop in statGroup.rb.profiler.season) {
      rb.season[camelCase(prop)] = Number(statGroup.rb.profiler.season[prop]);
      // rb.lastSeason[camelCase(prop)] = Number(statGroup.rb.profiler['last-season'][prop]);
      // rb.combined[camelCase(prop)] = Number(statGroup.rb.profiler.combined[prop]);
    }

    const wr = {} as PlayerProfilerSeason;
    for (const prop in statGroup.wr.profiler.season) {
      wr.season[camelCase(prop)] = Number(statGroup.wr.profiler.season[prop]);
      // wr.lastSeason[camelCase(prop)] = Number(statGroup.wr.profiler['last-season'][prop]);
      // wr.combined[camelCase(prop)] = Number(statGroup.wr.profiler.combined[prop]);
    }

    const te = {} as PlayerProfilerSeason;
    for (const prop in statGroup.te.profiler.season) {
      te.season[camelCase(prop)] = Number(statGroup.te.profiler.season[prop]);
      // te.lastSeason[camelCase(prop)] = Number(statGroup.te.profiler['last-season'][prop]);
      // te.combined[camelCase(prop)] = Number(statGroup.te.profiler.combined[prop]);
    }

    return {
      qb,
      rb,
      te,
      wr,
    };
  }

  static transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap, site: string): PlayerSlateAttr[] {
    if (objectIsEmpty(players)) {
      return [];
    }

    const siteMap = testSiteMap[site];

    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff?.[siteMap] ?? null,
      slateOwn: player.slate_ownership?.[siteMap] ?? null,
      ownership: transformPercToNumber(player.ownership?.[siteMap]) ?? null,
      value: transformPercToNumber(player.value_pct?.[siteMap]) ?? null,
      smash: transformPercToNumber(player.smash_pct?.[siteMap]) ?? null,
      expertRanking: SlateService.isNFLPlayer(player) ? player.ecr : null,
      defenseVsPos: SlateService.isNBAPlayer(player) ? player.dvp : null,
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
        statGroups: SlateService.transformStatGroupsToProfiler(res?.stat_groups),
        players: SlateService.transformPlayerSlateAttributes(res.players, request.site),
      }))
    );
  }
}

export type SlateTeam = Pick<Team, 'id'> & { vegas: Vegas } & Partial<{
    outsiders: OutsidersProps | null | undefined;
    safpts: ScheduleAdjFptsProps | null | undefined;
    rest: RestEntity | null | undefined;
  }>;

export type SlateTeamMap = Record<string, SlateTeam>;

type SlateAttributes = {
  teams: SlateTeam[] | null;
  players: PlayerSlateAttr[] | null;
  statGroups: PlayerProfilerSeasonMap | null | undefined;
};
