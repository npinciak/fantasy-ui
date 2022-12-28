import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { DfsSlatePlayer, Schedule as ScheduleImport, ScheduleTeamEntity } from '@dfsClient/daily-fantasy-client.model';
import { NFLClientGridIronPlayer } from '@dfsClient/nfl-client.model';
import { camelCase } from 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { uniqueBy } from 'sports-ui-sdk';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-endpoint-builder';
import { PlayersBySlate, SlatePlayer } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private endpoint: DailyFantasyEndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpoint = new DailyFantasyEndpointBuilder();
  }

  static normalizeNFLClientGridIronPlayer(gridIronPlayer: NFLClientGridIronPlayer): GridIronPlayer {
    if (!exists(gridIronPlayer.PLAYERID)) {
      throw new Error('gridIronPlayer.PLAYERID must exist');
    }

    const map = {} as GridIronPlayer;

    Object.keys(gridIronPlayer).forEach(k => {
      switch (k) {
        case 'OWNERSHIP':
          map[camelCase(k)] = {};
          break;
        case 'PLAYER':
        case 'TEAM':
        case 'POS':
        case 'OPP':
          map[camelCase(k)] = gridIronPlayer[k];
          break;
        case 'PLAYERID':
          map['playerId'] = exists(gridIronPlayer.PLAYERID) ? gridIronPlayer.PLAYERID : '';
          break;
        case 'PARTNERID':
          map['partnerId'] = exists(gridIronPlayer.PARTNERID) ? Number(gridIronPlayer.PARTNERID) : null;
          break;
        case 'FPTS/$':
          map['fptsPerK'] = exists(gridIronPlayer['FPTS/$']) ? Number(gridIronPlayer['FPTS/$']) : null;
          break;
        default:
          map[camelCase(k)] = exists(gridIronPlayer[k]) ? Number(gridIronPlayer[k]) : null;
          break;
      }
    });

    return map;
  }

  static transformDfsClientPlayerToPlayer(dfsClientPlayer: DfsSlatePlayer): SlatePlayer {
    const name =
      dfsClientPlayer.player.last_name.length <= 0
        ? dfsClientPlayer.player.first_name
        : `${dfsClientPlayer.player.first_name} ${dfsClientPlayer.player.last_name}`;

    return {
      id: dfsClientPlayer.player.id,
      rgId: dfsClientPlayer.player.rg_id,
      name,
      position: dfsClientPlayer.player.position,
      teamId: dfsClientPlayer.player.team_id,
      rgTeamId: dfsClientPlayer.player.rg_team_id,
      gameId: dfsClientPlayer.schedule.id,
      salaries: dfsClientPlayer.schedule.salaries,
    };
  }

  static transformDfsClientScheduleToSchedule(dfsClientSchedule: ScheduleImport): Schedule {
    const awayTeam = PlayerService.transformScheduleTeamEntityToTeam(dfsClientSchedule.team_away);
    const homeTeam = PlayerService.transformScheduleTeamEntityToTeam(dfsClientSchedule.team_home);
    const { id, date } = dfsClientSchedule;

    return {
      id,
      date,
      rgId: dfsClientSchedule.rg_id,
      awayTeam,
      homeTeam,
    };
  }

  static transformScheduleTeamEntityToTeam(scheduleTeamEntity: ScheduleTeamEntity): Team {
    const { id, name } = scheduleTeamEntity;

    return {
      id,
      name,
      rgId: scheduleTeamEntity.rg_id,
      shortName: scheduleTeamEntity.hashtag,
    };
  }

  playersBySlate(request: { slatePath: string }): Observable<PlayersBySlate> {
    const endpoint = request.slatePath.replace(this.endpoint.slateNonHttps, this.endpoint.slateHttps);
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
          teams: ([] as Team[]).concat(...home, ...away),
        };
      })
    );
  }

  getGridIronPlayers(request: { site: string }): Observable<GridIronPlayer[]> {
    let params = new HttpParams();
    params = params.append('site', request.site ?? 'draftkings');
    return this.apiService
      .get<NFLClientGridIronPlayer[]>(this.endpoint.gridIron, { params })
      .pipe(map(res => res.map(p => PlayerService.normalizeNFLClientGridIronPlayer(p))));
  }
}
