import { Injectable } from '@angular/core';
import { EspnClientEvent, EspnClientLeague } from '@app/espn/espn-client.model';
import { EspnService, Sports } from '@app/espn/espn.service';
import { logoImgBuilder } from '@app/espn/mlb/helpers';
import { EspnClientCompetitor } from '@app/espn/mlb/interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NflEvent, NflEventTeams } from '../models/nfl-event.model';

@Injectable({
  providedIn: 'root',
})
export class NflService {
  constructor(private espnClient: EspnService) {}

  footballLeague = (leagueId: number): Observable<any> =>
    this.espnClient.espnFantasyLeagueBySport(leagueId, Sports.football).pipe(map(res => transformEspnClientLeagueToFootballLeague(res)));

  footballEvents = (): Observable<NflEvent[]> =>
    this.espnClient.espnFantasyEventsBySport(Sports.football).pipe(map(res => transformEspnClientEventListToNflEventList(res.events)));
}

const transformEspnClientLeagueToFootballLeague = (espnLeague: EspnClientLeague) => espnLeague;

const transformEspnClientEventListToNflEventList = (events: EspnClientEvent[]): NflEvent[] =>
  events.map(event => ({
    id: event.id,
    date: event.date,
    summary: event.summary,
    teams: transformCompetitorToTeam(event.competitors),
  }));

const transformCompetitorToTeam = (competitors: EspnClientCompetitor[]): { [homeAway: string]: NflEventTeams } =>
  competitors.reduce((acc, val, i) => {
    acc[val.homeAway] = {
      score: val.score,
      abbrev: val.abbreviation,
      logo: logoImgBuilder('nfl', val.abbreviation),
      isWinner: val.winner,
    };
    return acc;
  }, {});
