import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameAttributesRequest, SlateService } from '@app/dfs/service/slate.service';
import { DfsSlateTransformers, DfsTransformers } from '@app/dfs/transformers/dfs-transformers.m';
import { ClientNflSlateAttributes } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFLClientGridIronPlayer } from '@sports-ui/daily-fantasy-sdk/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridIronPlayer, GridIronProjectionType } from '../models/nfl-gridIron.model';

@Injectable({
  providedIn: 'root',
})
export class NflSlateService extends SlateService {
  getNflGameAttributesBySlateId({ sport, site, slateId }: GameAttributesRequest) {
    return this.getGameAttributesBySlateId<ClientNflSlateAttributes>({ sport, site, slateId }).pipe(
      map(res => ({
        teams: DfsSlateTransformers.transformNflTeamSlateAttributes(res.teams),
        players: DfsSlateTransformers.transformPlayerSlateAttributes(res.players, site),
        // weather: DfsSlateTransformers.transformWeather(res.games),
      }))
    );
  }

  getGridIronPlayerProjections({
    site,
    projectionType,
  }: {
    site: string | null;
    projectionType: GridIronProjectionType;
  }): Observable<(GridIronPlayer | null)[]> {
    let params = new HttpParams();
    params = params.append('site', site ?? 'draftkings');
    return this.apiService
      .get<NFLClientGridIronPlayer[]>(this.endpoint.gridIronProjectionByProjectionType(projectionType), { params })
      .pipe(map(res => res.map(p => DfsTransformers.normalizeNFLClientGridIronPlayer(p))));
  }
}
