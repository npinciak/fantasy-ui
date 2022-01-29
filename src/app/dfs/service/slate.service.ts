import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { camelCase } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import { MLBClientSlateAttrTeam } from '../mlb/models/mlb-client.model';
import { SlateAttributes } from '../models/daily-fantasy-client-slate-sttr.model';
import { SlateMaster, Vegas } from '../models/daily-fantasy-client.model';
import { Team } from '../models/team.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam, RestEntity } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientProfiler, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';
import { OutsidersProps, ScheduleAdjFptsProps } from '../nfl/models/nfl-slate-attr.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  constructor(private apiService: ApiService) {}

  static isNFL(team: SlateTeamAttributes): team is NFLClientSlateAttrTeam {
    return 'safpts' in team;
  }

  static isNFLStatGroup(statGroup: SlateStatGroups): statGroup is NFLClientStatGroup {
    return 'qb' in statGroup;
  }

  static isNFLPlayer(player: SlatePlayerAttributes): player is NFLClientPlayerAttributes {
    return 'ecr' in player;
  }

  static isNBA(team: SlateTeamAttributes): team is NBAClientSlateAttrTeam {
    return 'rest' in team;
  }

  static isNBAPlayer(player: SlatePlayerAttributes): player is NBAClientPlayerAttributes {
    return 'dvp' in player;
  }

  static transform(teamAttributes: SlateTeamAttributes) {
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

  static transformStatGroups(statGroup: SlateStatGroups) {
    if (SlateService.isNFLStatGroup(statGroup)) {
      return {
        ...(statGroup ?? null),
      };
    }
  }

  static transformTeamSlateAttributes(teams: SlateTeamAttributesMap) {
    return Object.entries(teams).map(([id, team]) => ({
      id: id,
      vegas: team.vegas,
      outsiders: SlateService.transform(team).outsiders ?? null,
      safpts: SlateService.transform(team).safpts ?? null,
      rest: SlateService.transform(team).rest ?? null,
    }));
  }

  static transformStatGroupSlateAttributes(statGroup: NFLClientStatGroup) {
    return SlateService.transformStatGroups(statGroup);
  }

  static transformPlayerSlateAttributes(players: SlatePlayerAttributesMap) {
    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff ?? null,
      slateOwn: player.slate_ownership ?? null,
      ownership: player.ownership ?? null,
      value: player.value_pct ?? null,
      smash: player.smash_pct ?? null,
      ecr: SlateService.isNFLPlayer(player) ?? null,
      dvp: SlateService.isNBAPlayer(player) ?? null,
    }));
  }

  slatesByDate(request: { sport: string }): Observable<SlateMaster> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);
    return this.apiService.get<SlateMaster>(endpoint.slateMaster);
  }

  getGameAttrBySlateId(request: { sport: string; site: string; slateId: string }): Observable<{
    teams: SlateTeam[];
    players: any[];
    statGroups: {
      qb: NFLClientProfiler;
      rb: NFLClientProfiler;
      te: NFLClientProfiler;
      wr: NFLClientProfiler;
    };
  }> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);

    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slateId);
    return this.apiService.get<SlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => ({
        teams: SlateService.transformTeamSlateAttributes(res.teams),
        statGroups: SlateService.transformStatGroupSlateAttributes(res.stat_groups),
        players: SlateService.transformPlayerSlateAttributes(res.players),
      }))
    );
  }
}



export type SlateTeamAttributes = NFLClientSlateAttrTeam | MLBClientSlateAttrTeam | NBAClientSlateAttrTeam;
export type SlateTeamAttributesMap = Record<string, SlateTeamAttributes>;

export type SlateTeam = Pick<Team, 'id'> & { vegas: Vegas } & Partial<{
    outsiders: OutsidersProps | null;
    safpts: ScheduleAdjFptsProps | null;
    rest: RestEntity | null;
  }>;

export type SlateTeamMap = Record<string, SlateTeam>;

export type SlateStatGroups = NFLClientStatGroup;

export type SlatePlayerAttributes = NFLClientPlayerAttributes | NBAClientPlayerAttributes;
export type SlatePlayerAttributesMap = Record<string, SlatePlayerAttributes>;
