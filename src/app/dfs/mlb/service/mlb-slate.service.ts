import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { DailyFantasyEndpointBuilder } from '@app/dfs/daily-fantasy-endpoint-builder';
import { SlatePlayer } from '@app/dfs/models/slate-player.model';
import { SlateService } from '@app/dfs/service/slate.service';
import {
  ClientSlateAttributes,
  ClientSlatePlayerAttributesMap,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
  DfsClientPlayerAttributes,
} from '@dfsClient/daily-fantasy-client-slate-attr.model';
import { ClientVegas } from '@dfsClient/daily-fantasy-client.model';
import { MLBClientTeamAttributes } from '@dfsClient/mlb-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DFS_SITE_TO_DFS_SITETYPE_MAP } from 'sports-ui-sdk';

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

  static transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap, site: string): SlatePlayer[] {
    if (objectIsEmpty(players)) {
      return [];
    }

    const siteMap = DFS_SITE_TO_DFS_SITETYPE_MAP[site];

    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff?.[siteMap] ?? null,
      slateOwn: player.slate_ownership?.[siteMap] ?? null,
      ownership: normalizeStringToNumber(player.ownership?.[siteMap]) ?? null,
      value: normalizeStringToNumber(player.value_pct?.[siteMap]) ?? null,
      smash: normalizeStringToNumber(player.smash_pct?.[siteMap]) ?? null,
      stats: player.stats,
      plateIq: player.plateiq,
    }));
  }

  /**
   * Fetch Game attributes by slateId
   *
   * @param request
   * @returns
   */
  getGameAttrBySlateId(request: { sport: string; site: string; slate: string }): Observable<SlateAttributes> {
    const endpoint = new DailyFantasyEndpointBuilder();
    let params = new HttpParams();
    params = params.append('date', espnDateFormatter({ delim: '-' }));
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
  players: SlatePlayer[];
};

export type MlbSlateTeam = { id: string; vegas: ClientVegas } & DfsClientPlayerAttributes;
