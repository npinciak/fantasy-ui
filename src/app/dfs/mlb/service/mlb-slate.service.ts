import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { objectIsEmpty, transformPercToNumber } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { DailyFantasyEndpointBuilder } from '@app/dfs/daily-fantasy-endpoint-builder';
import { dfsSiteToDfsSiteTypeMap } from '@app/dfs/dfs.const';
import {
  ClientPlayerAttributes,
  ClientSlateAttributes,
  ClientSlatePlayerAttributesMap,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
} from '@app/dfs/models/daily-fantasy-client-slate-attr.model';
import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';
import { SlateService } from '@app/dfs/service/slate.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vegas } from '../../models/daily-fantasy-client.model';
import { MLBClientTeamAttributes } from '../models/mlb-client.model';

@Injectable({
  providedIn: 'root',
})
export class MlbSlateService {
  constructor(private apiService: ApiService) {}

  static transformMlbSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes, site: string): MLBClientTeamAttributes {
    const obj = {} as MLBClientTeamAttributes;

    // Object.assign(obj, { ...teamAttributes.vegas });

    // for (const prop in teamAttributes) {
    //   switch (prop) {
    //     case 'pitcher':
    //     case 'vegas':
    //       obj[prop] = { ...teamAttributes[prop] };
    //       break;
    //     default:
    //       obj[prop] = transformPercToNumber(teamAttributes[prop][site]);
    //       break;
    //   }
    // }

    return obj;
  }

  static transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap, site: string): MlbSlateTeam[] {
    if (objectIsEmpty(teams)) {
      return [];
    }
    return Object.entries(teams).map(([id, team]) => {
      const obj = {} as MlbSlateTeam;

      Object.assign(obj, { id });
      Object.assign(obj, { ...SlateService.transformMlbSlateTeamAttributes(team, site) });

      return obj;
    });
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
      stats: player.stats,
      plateIq: player.plateiq,
    }));
  }

  /**
   * Fetch Game attributes by slateId
   * @param request
   * @returns
   */
  getGameAttrBySlateId(request: { sport: string; site: string; slate: string }): Observable<SlateAttributes> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);
    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slate);
    return this.apiService.get<ClientSlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => {
        const teams = MlbSlateService.transformTeamSlateAttributes(res.teams, request.site);

        return {
          teams,
          players: SlateService.transformPlayerSlateAttributes(res.players, request.site),
        };
      })
    );
  }
}

type SlateAttributes = {
  teams: MlbSlateTeam[];
  players: PlayerSlateAttr[];
};

export type MlbSlateTeam = { id: string; vegas: Vegas } & ClientPlayerAttributes;
