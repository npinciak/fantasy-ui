import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { exists, objectIsEmpty, transformPercToNumber } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { camelCase } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import { dfsSiteToDfsSiteTypeMap } from '../dfs.const';
import { MLBClientTeamAttributes } from '../mlb/models/mlb-client.model';
import {
  ClientSlateAttributes,
  ClientSlatePlayerAttributesMap,
  ClientSlateStatGroups,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
} from '../models/daily-fantasy-client-slate-attr.model';
import { SlateMasterMap, Vegas } from '../models/daily-fantasy-client.model';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { Team } from '../models/team.model';
import { RestEntity } from '../nba/models/nba-client.model';
import { PlayerProfilerSeason, PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { OutsidersProps, ScheduleAdjFptsProps } from '../nfl/models/nfl-slate-attr.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  constructor(private apiService: ApiService) {}

  // TODO: Update return type here
  // static transform(teamAttributes: ClientSlateTeamAttributes):
  //   | {
  //       safpts: CamelCasedProperties<NFLClientSafptsProperties>;
  //       outsiders: CamelCasedProperties<NFLClientOutsidersProperties>;
  //       rest?: undefined;
  //     }
  //   | {
  //       safpts?: undefined;
  //       outsiders?: undefined;
  //       rest: RestEntity;
  //     } {
  //   if (SlateService.isNFL(teamAttributes)) {
  //     const safpts = {} as ScheduleAdjFptsProps;
  //     for (const prop in teamAttributes.safpts) {
  //       if (teamAttributes.safpts.hasOwnProperty(prop)) {
  //         safpts[camelCase(prop)] = teamAttributes.safpts[prop];
  //       }
  //     }

  //     const outsiders = {} as OutsidersProps;
  //     for (const prop in teamAttributes.outsiders) {
  //       if (teamAttributes.outsiders.hasOwnProperty(prop)) {
  //         outsiders[camelCase(prop)] = teamAttributes.outsiders[prop];
  //       }
  //     }

  //     return {
  //       safpts,
  //       outsiders,
  //     };
  //   } else if (SlateService.isNBA(teamAttributes)) {
  //     return {
  //       rest: teamAttributes.rest,
  //     };
  //   } else {
  //     return {
  //       teamAttibutes,
  //     };
  //   }
  // }

  static transformNbaSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes) {
    console.log(teamAttributes);

    return null;
  }

  static transformNflSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes) {
    console.log(teamAttributes);

    return null;
  }

  static transformMlbSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes, site: string): MLBClientTeamAttributes {
    const obj = {} as MLBClientTeamAttributes;

    for (const prop in teamAttributes) {
      switch (prop) {
        case 'pitcher':
        case 'vegas':
          obj[prop] = teamAttributes[prop];
          break;
        default:
          obj[prop] = transformPercToNumber(teamAttributes[prop][site]);
          break;
      }
    }

    return obj;
  }

  static transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap, sport: string, site: string) {
    if (objectIsEmpty(teams)) {
      return [];
    }

    return Object.entries(teams).map(([id, team]) => {
      const obj = {} as SlateTeam;
      Object.assign(obj, { id });
      switch (sport) {
        case 'mlb':
          Object.assign(obj, { ...SlateService.transformMlbSlateTeamAttributes(team, site) });
          break;
        case 'nba':
          Object.assign(obj, { rest: null });
          break;
        case 'nfl':
          Object.assign(obj, { outsiders: null });
          Object.assign(obj, { safpts: null });
          break;
        default:
          break;
      }

      return obj;
    });
  }

  static transformStatGroupsToProfiler(statGroup: ClientSlateStatGroups): PlayerProfilerSeasonMap | null | undefined {
    if (objectIsEmpty(statGroup) || !exists(statGroup)) {
      return null;
    }
    const qb = {} as PlayerProfilerSeason;

    for (const prop in statGroup.qb.profiler.season) {
      if (statGroup.qb.profiler.season.hasOwnProperty(prop)) {
        qb.season[camelCase(prop)] = Number(statGroup.qb.profiler.season[prop]);
      }
      // qb.lastSeason[camelCase(prop)] = Number(statGroup.qb.profiler['last-season'][prop]);
      //  qb.combined[camelCase(prop)] = Number(statGroup.qb.profiler.combined[prop]);
    }

    const rb = {} as PlayerProfilerSeason;
    for (const prop in statGroup.rb.profiler.season) {
      if (statGroup.rb.profiler.season.hasOwnProperty(prop)) {
        rb.season[camelCase(prop)] = Number(statGroup.rb.profiler.season[prop]);
      }
      // rb.lastSeason[camelCase(prop)] = Number(statGroup.rb.profiler['last-season'][prop]);
      // rb.combined[camelCase(prop)] = Number(statGroup.rb.profiler.combined[prop]);
    }

    const wr = {} as PlayerProfilerSeason;
    for (const prop in statGroup.wr.profiler.season) {
      if (statGroup.wr.profiler.season.hasOwnProperty(prop)) {
        wr.season[camelCase(prop)] = Number(statGroup.wr.profiler.season[prop]);
      }
      // wr.lastSeason[camelCase(prop)] = Number(statGroup.wr.profiler['last-season'][prop]);
      // wr.combined[camelCase(prop)] = Number(statGroup.wr.profiler.combined[prop]);
    }

    const te = {} as PlayerProfilerSeason;
    for (const prop in statGroup.te.profiler.season) {
      if (statGroup.te.profiler.season.hasOwnProperty(prop)) {
        te.season[camelCase(prop)] = Number(statGroup.te.profiler.season[prop]);
      }
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

    const siteMap = dfsSiteToDfsSiteTypeMap[site];

    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff?.[siteMap] ?? null,
      slateOwn: player.slate_ownership?.[siteMap] ?? null,
      ownership: transformPercToNumber(player.ownership?.[siteMap]) ?? null,
      value: transformPercToNumber(player.value_pct?.[siteMap]) ?? null,
      smash: transformPercToNumber(player.smash_pct?.[siteMap]) ?? null,
      expertRanking: null, // SlateService.isNFLPlayer(player) ? player.ecr : null,
      defenseVsPos: null, //SlateService.isNBAPlayer(player) ? player.dvp : null,
    }));
  }

  slatesByDate(request: { sport: string }): Observable<SlateMasterMap> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);
    return this.apiService.get<SlateMasterMap>(endpoint.slateMaster);
  }

  getGameAttrBySlateId(request: { sport: string; site: string; slate: string }): Observable<SlateAttributes> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);

    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slate);
    return this.apiService.get<ClientSlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => ({
        teams: SlateService.transformTeamSlateAttributes(res.teams, request.sport, request.site),
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
  teams: SlateTeam[];
  players: PlayerSlateAttr[];
  statGroups: PlayerProfilerSeasonMap | null | undefined;
};
