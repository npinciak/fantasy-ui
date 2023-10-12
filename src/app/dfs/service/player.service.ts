import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { DfsSlatePlayer } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { uniqueBy } from '@sports-ui/ui-sdk/helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../endpoint-builder/daily-fantasy-endpoint-builder';
import { PlayersBySlate } from '../models/player.model';
import { Team } from '../models/team.model';
import { DfsTransformers } from '../transformers/dfs-transformers.m';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private endpoint: DailyFantasyEndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpoint = new DailyFantasyEndpointBuilder();
  }

  getPlayersBySlate({ slatePath }: { slatePath: string }): Observable<PlayersBySlate> {
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
}
