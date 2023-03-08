import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { DfsSlatePlayer } from '@dfsClient/daily-fantasy-client.model';
import { NFLClientGridIronPlayer } from '@dfsClient/nfl-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { uniqueBy } from 'sports-ui-sdk';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-endpoint-builder';
import { PlayersBySlate } from '../models/player.model';
import { Team } from '../models/team.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';
import { DfsTransformers } from '../transformers/dfs-transformers.m';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private endpoint: DailyFantasyEndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpoint = new DailyFantasyEndpointBuilder();
  }

  /**
   * Fetch players by slate
   *
   * @param param0
   * @returns
   */
  playersBySlate({ slatePath }: { slatePath: string }): Observable<PlayersBySlate> {
    const endpoint = slatePath.replace(this.endpoint.slateNonHttps, this.endpoint.slateHttps);
    return this.apiService.get<DfsSlatePlayer[]>(endpoint).pipe(
      map(res => {
        const players = res.map(p => DfsTransformers.transformDfsClientPlayerToPlayer(p));

        const tmpSchedule = res.map(p => DfsTransformers.transformDfsClientScheduleToSchedule(p.schedule));

        const schedule = uniqueBy(tmpSchedule, s => s.id);
        const home = uniqueBy(schedule, s => s.homeTeam.id).map(t => t.homeTeam);
        const away = uniqueBy(schedule, s => s.awayTeam.id).map(t => t.awayTeam);

        return {
          players,
          schedule,
          teams: ([] as Team[]).concat(...home, ...away),
        };
      })
    );
  }

  /**
   * Fetch GridIron Insights
   *
   * @param param0
   * @returns
   */
  getGridIronPlayers({ site }: { site: string }): Observable<GridIronPlayer[]> {
    let params = new HttpParams();
    params = params.append('site', site ?? 'draftkings');
    return this.apiService
      .get<NFLClientGridIronPlayer[]>(this.endpoint.gridIron, { params })
      .pipe(map(res => res.map(p => DfsTransformers.normalizeNFLClientGridIronPlayer(p))));
  }
}
