import { Injectable } from '@angular/core';
import { EspnClientPlayer, EspnClientTeam } from '@app/espn/espn-client.model';
import { playerImgBuilder } from '@app/espn/espn.const';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { map } from 'rxjs/operators';
import { MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_POSITION_MAP } from '../consts/position.const';
import { MLB_TEAM_MAP } from '../consts/team.const';
import { isPitcher } from '../helpers';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam } from '../models/baseball-team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static transformEspnClientTeamListToTeamList(team: EspnClientTeam): BaseballTeam {
    return {
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev: team.abbrev,
      logo: team.logo,
      roster: team.roster.entries.map(e => MlbService.transformEspnClientTeamPlayerToBaseballPlayer(e)),
      totalPoints: team.points,
      currentRank: team.playoffSeed,
      rotoStats: team.valuesByStat,
    };
  }

  static transformEspnClientTeamPlayerToBaseballPlayer(player: EspnClientPlayer): BaseballPlayer {
    return {
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
      stats: player.playerPoolEntry.player.stats,
      lineupSlotId: player.lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
    };
  }

  baseballLeague(leagueId: number) {
    return this.espnClient.espnFantasyLeagueBySport(FantasySports.baseball, leagueId).pipe(
      map(res => ({
        scoringPeriodId: res.scoringPeriodId,
        teams: res.teams.map(team => MlbService.transformEspnClientTeamListToTeamList(team)),
      }))
    );
  }
}
