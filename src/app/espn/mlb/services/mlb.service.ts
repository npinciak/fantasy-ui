import { Injectable } from '@angular/core';
import { EspnClientLeague, EspnClientPlayer, EspnClientTeam } from '@app/espn/espn-client.model';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPitcher } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static transformEspnClientLeagueToBaseballLeague(espnLeague: EspnClientLeague) {
    return {
      teams: MlbService.transformEspnClientTeamListToTeamList(espnLeague.teams),
    };
  }

  static transformEspnClientTeamListToTeamList(teams: EspnClientTeam[]) {
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

  static transformEspnClientTeamPlayerListToBaseballPlayerList(players: EspnClientPlayer[]) {
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
    return this.espnClient.espnFantasyLeagueBySport(FantasySports.baseball, leagueId).pipe(map(res => res));
  }
}
