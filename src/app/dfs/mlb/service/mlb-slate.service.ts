import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { objectIsEmpty } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { DailyFantasyEndpointBuilder } from '@app/dfs/daily-fantasy-endpoint-builder';
import { SlatePlayer } from '@app/dfs/models/slate-player.model';
import { DfsSlateTransformers } from '@app/dfs/transformers/dfs-transformers.m';
import { ClientSlateAttributes, ClientSlateTeamAttributesMap, Vegas } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { DfsClientPlayerAttributes } from '@sports-ui/daily-fantasy-sdk/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MlbSlateService {
  constructor(private apiService: ApiService) {}

  static transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap, site: string): MlbSlateTeam[] {
    if (objectIsEmpty(teams)) return [];

    return Object.entries(teams).map(([id, team]) => {
      const obj = {} as MlbSlateTeam;

      obj.id = id;

      Object.assign(obj, { ...DfsSlateTransformers.transformMlbSlateTeamAttributes(team, site) });

      return obj;
    });
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
    params = params.append('date', espnDateFormatter({ delim: '-', date: new Date().getTime() }));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slate);
    return this.apiService.get<ClientSlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => {
        const teams = MlbSlateService.transformTeamSlateAttributes(res.teams, request.site);

        return {
          teams,
          players: DfsSlateTransformers.transformPlayerSlateAttributes(res.players, request.site),
        };
      })
    );
  }
}

type SlateAttributes = {
  teams: MlbSlateTeam[];
  players: SlatePlayer[];
};

export type MlbSlateTeam = { id: string; vegas: Vegas } & DfsClientPlayerAttributes;
