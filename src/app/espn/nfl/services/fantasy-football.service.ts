import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { PlayerNews } from '@app/espn/models/player-news.model';
import { EspnService } from '@app/espn/service/espn.service';
import { EspnTransformers } from '@app/espn/transformers/espn-transformers.m';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspnClient } from 'sports-ui-sdk';
import { FootballLeague } from '../models/fantasy-football-league.model';
import { FantasyFootballTransformers } from '../transformers/fantasy-football.transformers.m';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballService {
  constructor(private client: EspnService) {}

  /**
   * Return fantasy football league
   *
   * @param leagueId
   * @param year
   * @returns
   */
  fetchLeague(leagueId: string, year: string): Observable<FootballLeague> {
    return this.client.fetchFantasyLeagueBySport<EspnClient.FootballLeague>({ sport: FantasySports.Football, leagueId, year }).pipe(
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
  fetchPlayerNews(playerId): Observable<PlayerNews[]> {
    return this.client
      .fetchFantasyPlayerNewsBySport({ sport: FantasySports.Football, lookbackDays: '30', playerId })
      .pipe(map(res => [{ id: playerId, news: res.feed }]));
  }

  /**
   * Return fantasy football league free agents
   *
   * @param payload
   * @returns
   */
  fetchFreeAgents(payload: { leagueId: string; scoringPeriodId: string; filter: EspnClient.PaginatedFilter | null }) {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.client
      .fetchFantasyFreeAgentsBySport(FantasySports.Football, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyFootballTransformers.clientFreeAgentToFootballPlayer(res.players)));
  }
}
