import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EspnService, Sports } from '@app/espn/espn.service';
import { isPitcher } from '../helpers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';

import { Team } from '../models/team.model';
import { EspnClientLeague, EspnClientPlayer, EspnClientTeam } from '@app/espn/espn-client.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static transformEspnClientLeagueToBaseballLeague(espnLeague: EspnClientLeague): BaseballLeague {
    return {
      teams: MlbService.transformEspnClientTeamListToTeamList(espnLeague.teams),
    };
  }

  static transformEspnClientTeamListToTeamList(teams: EspnClientTeam[]): Team[] {
    return teams.map(team => ({
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev: team.abbrev,
      logo: team.logo,
      roster: MlbService.transformEspnClientTeamPlayerListToBaseballPlayerList(team.roster.entries),
      totalPoints: team.points,
      currentRank: team.playoffSeed,
    }));
  }

  static transformEspnClientTeamPlayerListToBaseballPlayerList(players: EspnClientPlayer[]): BaseballPlayer[] {
    return players.map(player => ({
      id: player.playerId.toString(),
      name: player.playerPoolEntry.player.fullName,
      isInjured: player.playerPoolEntry.player.injured,
      injuryStatus: player.playerPoolEntry.player.injuryStatus,
      playerRatings: player.playerPoolEntry.ratings,
      playerOwnership: {
        change: player.playerPoolEntry.player.ownership.percentChange,
        percentOwned: player.playerPoolEntry.player.ownership.percentOwned,
      },
      isPitcher: isPitcher(player.playerPoolEntry.player.eligibleSlots),
    }));
  }

  baseballLeague(leagueId: number): Observable<EspnClientLeague> {
    return this.espnClient.espnFantasyLeagueBySport(Sports.baseball, leagueId).pipe(map(res => res));
  }
}
