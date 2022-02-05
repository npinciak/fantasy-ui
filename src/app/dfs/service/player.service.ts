import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { uniqueBy } from '@app/@shared/helpers/unique-by';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import { DfsSlatePlayer, Schedule as ScheduleImport, ScheduleTeamEntity } from '../models/daily-fantasy-client.model';
import { Player, PlayersBySlate } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private apiService: ApiService) {}

  static transformDfsClientPlayerToPlayer(dfsClientPlayer: DfsSlatePlayer): Omit<Player, 'img' | 'team'> {
    return {
      id: dfsClientPlayer.player.id,
      rgId: dfsClientPlayer.player.rg_id,
      name: `${dfsClientPlayer.player.first_name} ${dfsClientPlayer.player.last_name}`,
      position: dfsClientPlayer.player.position,
      teamId: dfsClientPlayer.player.team_id,
      rgTeamId: dfsClientPlayer.player.rg_team_id,
      gameId: dfsClientPlayer.schedule.id,
    };
  }

  static transformDfsClientScheduleToSchedule(dfsClientSchedule: ScheduleImport): Schedule {
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

  playersBySlate(request: { slatePath: string }): Observable<PlayersBySlate> {
    const endpointBuilder = new DailyFantasyEndpointBuilder();
    const endpoint = request.slatePath.replace(endpointBuilder.slateNonHttps, endpointBuilder.slateHttps);
    return this.apiService.get<DfsSlatePlayer[]>(endpoint).pipe(
      map(res => {
        const players = res.map(p => PlayerService.transformDfsClientPlayerToPlayer(p));

        const tmpSchedule = res.map(p => PlayerService.transformDfsClientScheduleToSchedule(p.schedule));

        const schedule = uniqueBy(tmpSchedule, s => s.id);
        const home = uniqueBy(schedule, s => s.homeTeam.id).map(t => t.homeTeam);
        const away = uniqueBy(schedule, s => s.awayTeam.id).map(t => t.awayTeam);

        return {
          players,
          schedule,
          teams: [].concat(...home, ...away),
        };
      })
    );
  }

  getGridIronPlayers(request: { site: string }) {
    let params = new HttpParams();
    params = params.append('site', request.site ?? 'draftkings');

    const endpointBuilder = new DailyFantasyEndpointBuilder();
    return this.apiService.get<any[]>(endpointBuilder.gridIron, { params });
  }
}
