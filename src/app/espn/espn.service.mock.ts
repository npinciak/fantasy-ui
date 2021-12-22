import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspnClientLeague, EspnClientEventList } from './espn-client.model';
import { EspnService, Sports } from './espn.service';
import { FastcastEvent } from './models/fastcast-event.model';

export type Mock<T> = { [key in keyof T]: T[key] };

export class EspnServiceMock implements Mock<EspnService> {
  espnUpdateFantasyTeam(payload: unknown, sport: Sports, leagueId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  espnFantasyLeagueBySport(sport: Sports, leagueId: number): Observable<EspnClientLeague> {
    throw new Error('Method not implemented.');
  }
  espnFantasyPlayerNewsBySport(sport: Sports, numDays: number, playerId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  espnFantasyFreeAgentsBySport(sport: Sports, leagueId: number, scoringPeriod: number, headers: HttpHeaders): Observable<any> {
    throw new Error('Method not implemented.');
  }
  espnFantasyEventsBySport(sport: Sports): Observable<EspnClientEventList> {
    throw new Error('Method not implemented.');
  }
  espnFastcast(url: string): Observable<{ slug: string; league: { [league: string]: FastcastEvent[] } }[]> {
    throw new Error('Method not implemented.');
  }
}
