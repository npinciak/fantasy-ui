import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DfsSlatePlayer } from '../models/daily-fantasy-client.model';

import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private apiService: ApiService) {}

  static transformDfsClientPlayerToPlayer(dfsClientPlayer: DfsSlatePlayer): Player {
    return {
      id: dfsClientPlayer.player.id,
      name: `${dfsClientPlayer.player.first_name} ${dfsClientPlayer.player.last_name}`,
      position: dfsClientPlayer.player.position,
      img: null,
      team: null,
      teamId: dfsClientPlayer.player.team_id,
      schedule: dfsClientPlayer.schedule,
    };
  }

  playersBySlate(slatePath: string): Observable<Player[]> {
    let params = new HttpParams();
    params = params.append('timestamp', new Date().toISOString());
    return this.apiService
      .get<DfsSlatePlayer[]>(slatePath, { params })
      .pipe(map(res => res.map(p => PlayerService.transformDfsClientPlayerToPlayer(p))));
  }
}
