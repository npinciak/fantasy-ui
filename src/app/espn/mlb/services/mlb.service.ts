import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspnTransformers } from '@app/espn/espn.transformers';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspnClient } from 'sports-ui-sdk';
import { FantasyBaseballTransformers } from '../fantasy-baseball.transformers';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  /**
   * Return fantasy baseball league
   * @param leagueId
   * @param year
   * @returns
   */
  baseballLeague(leagueId: string, year: string): Observable<BaseballLeague> {
    return this.espnClient.fetchFantasyLeagueBySport<EspnClient.BaseballLeague>({ sport: FantasySports.Baseball, leagueId, year }).pipe(
      map(res => {
        const genericLeagueSettings = EspnTransformers.clientLeagueToLeague(res);
        return FantasyBaseballTransformers.clientLeagueToBaseballLeague(res, genericLeagueSettings);
      })
    );
  }

  /**
   * Return games for current date
   * @returns
   */
  baseballEvents(): Observable<BaseballEvent[]> {
    return this.espnClient
      .fetchFantasyLeagueEvents(FantasySports.Baseball)
      .pipe(map(res => res.events.map(e => FantasyBaseballTransformers.clientEventToBaseballEvent(e))));
  }

  /**
   * Return baseball player latest news
   * @param payload
   * @returns
   */
  baseballPlayerNews(playerId: string): Observable<EspnClient.PlayerNewsFeedEntity[]> {
    return this.espnClient
      .fetchFantasyPlayerNewsBySport({ sport: FantasySports.Baseball, lookbackDays: '30', playerId })
      .pipe(map(res => res.feed));
  }

  /**
   * Return fantasy baseball league free agents
   * @param payload
   * @returns
   */
  baseballFreeAgents(payload: {
    leagueId: string;
    scoringPeriodId: string;
    filter: EspnClient.PaginatedFilter;
  }): Observable<BaseballPlayer[]> {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    return this.espnClient
      .fetchFantasyFreeAgentsBySport(FantasySports.Baseball, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyBaseballTransformers.transformEspnClientFreeAgentToBaseballPlayer(res.players)));
  }
}
