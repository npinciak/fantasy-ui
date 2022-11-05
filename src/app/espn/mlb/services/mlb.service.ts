import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import {
  EspnClientBaseballLeague,
  EspnClientEvent,
  EspnClientFreeAgent,
  EspnClientPaginatedFilter,
  EspnClientPlayer,
  EspnClientPlayerNewsFeedEntity,
  EspnClientScheduleTeam,
  EspnClientTeam,
  EspnLeagueId,
  EspnSport,
} from '@espnClient/espn-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { transformEspnClientLeagueToLeague, transformEspnClientPlayerToPlayer } from '../../espn-helpers';
import { MLB_LINEUP_MAP, PitcherIdSet } from '../consts/lineup.const';
import { MLB_POSITION_MAP } from '../consts/position.const';
import { MLB_TEAM_MAP } from '../consts/team.const';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static isPitcher(eligiblePos: number[]): boolean {
    for (let i = 0; i < eligiblePos.length; i++) {
      if (PitcherIdSet.has(eligiblePos[i])) {
        return true;
      }
      return false;
    }
    return false;
  }

  static transformEspnClientEventToBaseballEvent(event: EspnClientEvent): BaseballEvent {
    return {
      id: event.id,
      uid: event.uid,
      competitors: event.competitors.reduce((acc, val) => {
        const { id, homeAway, abbreviation } = val;
        acc[val.id] = { id, homeAway, abbreviation };
        return acc;
      }, {}),
    };
  }

  static transformEspnClientTeamListToTeamList(team: EspnClientTeam): BaseballTeam {
    const { abbrev, logo } = team;

    return {
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev,
      logo,
      roster: MlbService.transformEspnClientTeamPlayerToBaseballPlayer(team.roster?.entries),
      totalPoints: team.points,
      liveScore: 0,
      currentRank: team.playoffSeed,
      rotoStats: team.valuesByStat,
    };
  }

  static transformEspnClientScheduleTeamListToTeamList(team: EspnClientScheduleTeam): BaseballTeamLive {
    const { totalPoints, teamId, totalPointsLive, rosterForCurrentScoringPeriod } = team;

    return {
      id: teamId.toString(),
      totalPoints,
      liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
      roster: MlbService.transformEspnClientTeamPlayerToBaseballPlayer(rosterForCurrentScoringPeriod.entries),
    };
  }

  static transformEspnClientTeamPlayerToBaseballPlayer(players: EspnClientPlayer[]): BaseballPlayer[] {
    return players.map(player => {
      if (!exists(player.playerPoolEntry)) {
        throw new Error('player.playerPoolEntry must be defined');
      }

      const playerInfo = transformEspnClientPlayerToPlayer(player.playerPoolEntry?.player, {
        sport: EspnSport.Baseball,
        leagueId: EspnLeagueId.MLB,
        teamMap: MLB_TEAM_MAP,
        positionMap: MLB_POSITION_MAP,
      });

      return {
        ...playerInfo,
        playerRatings: player.playerPoolEntry?.ratings,
        isPitcher: MlbService.isPitcher(player.playerPoolEntry?.player.eligibleSlots),
        lineupSlotId: player.lineupSlotId,
        isStarting: false,
        startingStatus: null,
        lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
        starterStatusByProGame: player.playerPoolEntry?.player.starterStatusByProGame,
        lastNewsDate: player.playerPoolEntry.player.lastNewsDate,
      };
    });
  }

  static transformEspnClientFreeAgentToBaseballPlayer(players: EspnClientFreeAgent[]): BaseballPlayer[] {
    return players.map(player => {
      if (!exists(player.player)) {
        throw new Error('player.player must be defined');
      }

      const playerInfo = transformEspnClientPlayerToPlayer(player.player, {
        sport: EspnSport.Baseball,
        leagueId: EspnLeagueId.MLB,
        teamMap: MLB_TEAM_MAP,
        positionMap: MLB_POSITION_MAP,
      });

      return {
        ...playerInfo,
        playerRatings: player.ratings,
        isPitcher: MlbService.isPitcher(player.player.eligibleSlots),
        lineupSlotId: 0,
        isStarting: false,
        startingStatus: null,
        lineupSlot: '',
        starterStatusByProGame: {},
        lastNewsDate: player.player.lastNewsDate,
      };
    });
  }

  /**
   * Return fantasy baseball league
   * @param leagueId
   * @param year
   * @returns
   */
  baseballLeague(leagueId: string, year: string): Observable<BaseballLeague> {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');
    return this.espnClient
      .espnFantasyLeagueBySport<EspnClientBaseballLeague>({ sport: FantasySports.Baseball, leagueId, year, headers })
      .pipe(
        map(res => {
          const genericLeagueSettings = transformEspnClientLeagueToLeague(res);

          const schedule = res.schedule[0];

          const teams = res.teams.map(t => MlbService.transformEspnClientTeamListToTeamList(t));
          const teamsLive = exists(schedule.teams)
            ? schedule.teams.map(t => MlbService.transformEspnClientScheduleTeamListToTeamList(t))
            : [];

          return {
            ...genericLeagueSettings,
            teams,
            teamsLive,
            freeAgents: MlbService.transformEspnClientFreeAgentToBaseballPlayer(res.players),
          };
        })
      );
  }

  /**
   * Return games for current date
   * @returns
   */
  baseballEvents(): Observable<BaseballEvent[]> {
    return this.espnClient
      .espnFantasyLeagueEvents(FantasySports.Baseball)
      .pipe(map(res => res.events.map(e => MlbService.transformEspnClientEventToBaseballEvent(e))));
  }

  /**
   * Return baseball player latest news
   * @param payload
   * @returns
   */
  baseballPlayerNews(payload: { lookbackDays: string; playerId: string }): Observable<EspnClientPlayerNewsFeedEntity[]> {
    const data = {
      sport: FantasySports.Baseball,
      lookbackDays: payload.lookbackDays,
      playerId: payload.playerId,
    };
    return this.espnClient.espnFantasyPlayerNewsBySport(data).pipe(map(res => res.feed));
  }

  /**
   * Return fantasy baseball league free agents
   * @param payload
   * @returns
   */
  baseballFreeAgents(payload: {
    leagueId: string;
    scoringPeriodId: number;
    filter: EspnClientPaginatedFilter;
  }): Observable<BaseballPlayer[]> {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.espnClient
      .espnFantasyFreeAgentsBySport(FantasySports.Baseball, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => MlbService.transformEspnClientFreeAgentToBaseballPlayer(res.players)));
  }
}
