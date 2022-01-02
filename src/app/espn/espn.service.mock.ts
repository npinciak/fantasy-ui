import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mock } from '@app/@shared/models/mock.model';
import { EspnClientLeague, EspnClientEventList } from './espn-client.model';
import { EspnService, Sports } from './espn.service';
import { LeaguesEntity } from './models/espn-fastcast.model';

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
  espnFastcast(url: string): Observable<LeaguesEntity[]> {
    throw new Error('Method not implemented.');
  }
}
