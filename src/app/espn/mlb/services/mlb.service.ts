import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@app/@shared/services/api.service';
import { EspnService, Sports } from '@app/espn/espn.service';
import { isPitcher, logoImgBuilder } from '../helpers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { MlbEvent, MlbEventTeams } from '../models/mlb-event.model';
import { Team } from '../models/team.model';
import { EspnClientCompetitor, EspnClientEvent, EspnClientLeague, EspnClientPlayer, EspnClientTeam } from '@app/espn/espn-client.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  baseballLeague = (leagueId: number): Observable<BaseballLeague> =>
    this.espnClient.espnFantasyLeagueBySport(leagueId, Sports.baseball).pipe(map(res => transformEspnClientLeagueToBaseballLeague(res)));

  baseballEvents = (): Observable<MlbEvent[]> =>
    this.espnClient.espnFantasyEventsBySport(Sports.baseball).pipe(map(res => transformEspnClientEventListToMlbEventList(res.events)));
}

const transformEspnClientLeagueToBaseballLeague = (espnLeague: EspnClientLeague): BaseballLeague => ({
  teams: transformEspnClientTeamListToTeamList(espnLeague.teams),
});

const transformEspnClientTeamListToTeamList = (teams: EspnClientTeam[]): Team[] =>
  teams.map(team => ({
    id: team.id.toString(),
    name: `${team.location} ${team.nickname}`,
    abbrev: team.abbrev,
    logo: team.logo,
    roster: transformEspnClientTeamPlayerListToBaseballPlayerList(team.roster.entries),
    totalPoints: team.points,
    currentRank: team.playoffSeed,
  }));

const transformEspnClientTeamPlayerListToBaseballPlayerList = (players: EspnClientPlayer[]): BaseballPlayer[] =>
  players.map(player => ({
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

const transformEspnClientEventListToMlbEventList = (events: EspnClientEvent[]): MlbEvent[] =>
  events.map(event => ({
    id: event.id,
    date: event.date,
    summary: event.summary,
    teams: transformCompetitorToTeam(event.competitors),
  }));

const transformCompetitorToTeam = (competitors: EspnClientCompetitor[]): { [homeAway: string]: MlbEventTeams } =>
  competitors.reduce((acc, val, i) => {
    acc[val.homeAway] = {
      score: val.score,
      abbrev: val.abbreviation,
      logo: logoImgBuilder('mlb', val.abbreviation),
      isWinner: val.winner,
    };
    return acc;
  }, {});
