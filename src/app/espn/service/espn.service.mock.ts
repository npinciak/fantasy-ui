import { HttpHeaders } from '@angular/common/http';
import { Mock } from '@app/@shared/models/mock.model';
import { Observable } from 'rxjs';
import { EspnClientLeague } from '../espn-client.model';
import { FantasySports } from '../models/espn-endpoint-builder.model';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FeedArticle } from '../models/feed.model';
import { League } from '../models/league.model';
import { EspnService } from './espn.service';

export class EspnServiceMock implements Mock<EspnService> {
  espnFantasyPlayerNewsBySport(data: { sport: FantasySports; lookbackDays: string; playerId: string }): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  espnPositions(sport: any, league: any): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  espnUpdateFantasyTeam(payload: unknown, sport: FantasySports, leagueId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  espnFantasyLeagueBySport(sport: FantasySports, leagueId: number): Observable<EspnClientLeague> {
    throw new Error('Method not implemented.');
  }

  espnFantasyFreeAgentsBySport(sport: FantasySports, leagueId: number, scoringPeriod: number, headers: HttpHeaders): Observable<any> {
    throw new Error('Method not implemented.');
  }

  espnFastcast(
    url: string
  ): Observable<{ transformLeaguesImportToLeagues: League[]; transformEventImportToFastcastEvent: FastcastEvent[] }> {
    throw new Error('Method not implemented.');
  }
  espnOneFeed(offset?: number, limit?: number): Observable<FeedArticle[]> {
    throw new Error('Method not implemented.');
  }
}
