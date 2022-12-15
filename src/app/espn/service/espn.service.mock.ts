import { HttpHeaders } from '@angular/common/http';
import { Mock } from '@app/@shared/models/mock.model';
import { EspnClientEventList, EspnClientFreeAgentEntry, EspnClientPlayerNews } from '@client/espn-client.model';
import { Observable } from 'rxjs';
import { FantasySports } from '../models/espn-endpoint-builder.model';
import { EspnService } from './espn.service';

export class EspnServiceMock implements Mock<EspnService> {
  updateFantasyTeam(payload: unknown, sport: FantasySports, leagueId: string): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  fetchFantasyLeagueBySport<T>(data: {
    sport: FantasySports;
    leagueId: string;
    year: string;
    headers?: HttpHeaders | undefined;
  }): Observable<T> {
    throw new Error('Method not implemented.');
  }
  fetchFantasyLeagueEvents(sport: FantasySports, headers?: HttpHeaders | undefined): Observable<EspnClientEventList> {
    throw new Error('Method not implemented.');
  }
  fetchFantasyPlayerNewsBySport(data: { sport: FantasySports; lookbackDays: string; playerId: string }): Observable<EspnClientPlayerNews> {
    throw new Error('Method not implemented.');
  }
  fetchFantasyFreeAgentsBySport(
    sport: FantasySports,
    leagueId: string,
    scoringPeriod: number,
    headers: HttpHeaders
  ): Observable<{ players: EspnClientFreeAgentEntry[] }> {
    throw new Error('Method not implemented.');
  }
  fetchFastcast(url: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
