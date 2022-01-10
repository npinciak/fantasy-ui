import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DfsSlatePlayer, Schedule, ScheduleTeamEntity } from '../models/daily-fantasy-client.model';

import { Player } from '../models/player.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private apiService: ApiService) {}

  static transformDfsClientPlayerToPlayer(dfsClientPlayer: DfsSlatePlayer): Player {
    console.log(PlayerService.transformDfsClientSchduleToSchedule(dfsClientPlayer.schedule));

    return {
      id: dfsClientPlayer.player.id,
      rgId: dfsClientPlayer.player.rg_id,
      name: `${dfsClientPlayer.player.first_name} ${dfsClientPlayer.player.last_name}`,
      position: dfsClientPlayer.player.position,
      teamId: dfsClientPlayer.player.team_id,
      rgTeamId: dfsClientPlayer.player.rg_team_id,
      img: null,
      team: null,
    };
  }

  /**
   * @todo Create model
   *
   * @param dfsClientSchedule `Schedule`
   * @returns
   */
  static transformDfsClientSchduleToSchedule(dfsClientSchedule: Schedule) {
    const awayTeam = PlayerService.transformScheduleTeamEntityToTeam(dfsClientSchedule.team_away);
    const homeTeam = PlayerService.transformScheduleTeamEntityToTeam(dfsClientSchedule.team_home);
    return {
      id: dfsClientSchedule.id,
      rgId: dfsClientSchedule.rg_id,
      date: dfsClientSchedule.date,
      awayTeam,
      homeTeam,
    };
  }

  static transformScheduleTeamEntityToTeam(scheduleTeamEntity: ScheduleTeamEntity): Team {
    return {
      id: scheduleTeamEntity.id,
      rgId: scheduleTeamEntity.rg_id,
      name: scheduleTeamEntity.name,
      shortName: scheduleTeamEntity.hashtag,
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
