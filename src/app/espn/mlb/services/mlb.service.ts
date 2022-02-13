import { Injectable } from '@angular/core';
import {
  EspnClientFreeAgent,
  EspnClientPlayer,
  EspnClientPlayerStatsEntityMap,
  EspnClientPlayerStatsYear,
  EspnClientTeam,
} from '@app/espn/espn-client.model';
import { playerImgBuilder } from '@app/espn/espn.const';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_POSITION_MAP } from '../consts/position.const';
import { MLB_TEAM_MAP } from '../consts/team.const';
import { isPitcher, statsKeyMap } from '../helpers';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam } from '../models/baseball-team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static transformEspnClientTeamListToTeamList(teams: EspnClientTeam[]): BaseballTeam[] {
    return teams.map(team => ({
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev: team.abbrev,
      logo: team.logo,
      roster: MlbService.transformEspnClientTeamPlayerToBaseballPlayer(team.roster.entries),
      totalPoints: team.points,
      currentRank: team.playoffSeed,
      rotoStats: team.valuesByStat,
    }));
  }

  static transformEspnClientTeamPlayerToBaseballPlayer(players: EspnClientPlayer[]): BaseballPlayer[] {
    return players.map(player => ({
      id: player.playerId.toString(),
      name: player.playerPoolEntry.player.fullName,
      img: playerImgBuilder(player.playerId, 'mlb'),
      team: MLB_TEAM_MAP[player.playerPoolEntry.player.proTeamId],
      position: MLB_POSITION_MAP[player.playerPoolEntry.player.defaultPositionId].abbrev,
      isInjured: player.playerPoolEntry.player.injured,
      injuryStatus: player.playerPoolEntry.player.injuryStatus,
      playerRatings: player.playerPoolEntry.ratings,
      playerOwnershipChange: player.playerPoolEntry.player.ownership.percentChange,
      playerOwnershipPercentOwned: player.playerPoolEntry.player.ownership.percentOwned,
      isPitcher: isPitcher(player.playerPoolEntry.player.eligibleSlots),
      stats: MlbService.flattenPlayerStats(player.playerPoolEntry.player.stats),
      lineupSlotId: player.lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
    }));
  }

  static flattenPlayerStats(stats: EspnClientPlayerStatsYear[]): EspnClientPlayerStatsEntityMap {
    return stats?.reduce((obj, val) => {
      obj[val.id] = statsKeyMap(val.stats);
      return obj;
    }, {} as EspnClientPlayerStatsEntityMap);
  }

  static transformEspnClientFreeAgentToBaseballPlayer(players: EspnClientFreeAgent[]): BaseballPlayer[] {
    return players.map(player => ({
      id: player.id.toString(),
      name: player.player.fullName,
      img: playerImgBuilder(player.id, 'mlb'),
      team: MLB_TEAM_MAP[player.player.proTeamId],
      position: MLB_POSITION_MAP[player.player.defaultPositionId].abbrev,
      isInjured: player.player.injured,
      injuryStatus: player.player.injuryStatus,
      playerRatings: player.ratings,
      playerOwnershipChange: player.player.ownership?.percentChange,
      playerOwnershipPercentOwned: player.player.ownership?.percentOwned,
      isPitcher: isPitcher(player.player.eligibleSlots),
      stats: MlbService.flattenPlayerStats(player.player.stats),
      lineupSlotId: null,
      isStarting: false,
      startingStatus: null,
      lineupSlot: null,
    }));
  }

  /**
   * Return fantasy baseball league
   * @param leagueId
   * @returns
   */
  baseballLeague(leagueId: number): Observable<{
    scoringPeriodId: number;
    teams: BaseballTeam[];
    freeAgents: BaseballPlayer[];
  }> {
    return this.espnClient.espnFantasyLeagueBySport(FantasySports.baseball, leagueId).pipe(
      map(res => ({
        scoringPeriodId: res.scoringPeriodId,
        teams: MlbService.transformEspnClientTeamListToTeamList(res.teams),
        freeAgents: MlbService.transformEspnClientFreeAgentToBaseballPlayer(res.players),
      }))
    );
  }
}
