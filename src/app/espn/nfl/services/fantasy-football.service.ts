import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspnTransformers } from '@app/espn/espn.transformers';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';
import { FantasyFootballTransformers } from '../fantasy-football.transformers';
import { FootballLeague } from '../models/fantasy-football-league.model';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballService {
  constructor(private espnClient: EspnService) {}

  /**
   * Return fantasy football league
   *
   * @param leagueId
   * @param year
   * @returns
   */
  fetchLeague(leagueId: string, year: string): Observable<FootballLeague> {
    return this.espnClient.fetchFantasyLeagueBySport<EspnClient.FootballLeague>({ sport: FantasySports.Football, leagueId, year }).pipe(
      map(res => {
        const genericLeagueSettings = EspnTransformers.clientLeagueToLeague(res);
        return FantasyFootballTransformers.clientLeagueToFootballLeague(res, genericLeagueSettings);
      })
    );
  }

  /**
   * Return player news by Id
   *
   * @param playerId
   * @returns
   */
  fetchPlayerNews(playerId): Observable<EspnClient.PlayerNewsFeedEntity[]> {
    return this.espnClient
      .fetchFantasyPlayerNewsBySport({ sport: FantasySports.Football, lookbackDays: '30', playerId })
      .pipe(map(res => res.feed));
  }

  /**
   * Return fantasy football league free agents
   * @param payload
   * @returns
   */
  fetchFreeAgents(payload: { leagueId: string; scoringPeriodId: number; filter: EspnClient.PaginatedFilter | null }) {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.espnClient
      .fetchFantasyFreeAgentsBySport(FantasySports.Football, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyFootballTransformers.clientFreeAgentToFootballPlayer(res.players)));
  }
}
