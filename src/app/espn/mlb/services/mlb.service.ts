import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { EspnEndpointBuilder, EspnParamFragment, FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { PlayerNews } from '@app/espn/models/player-news.model';
import { EspnService } from '@app/espn/service/espn.service';
import { EspnTransformers } from '@app/espn/transformers/espn-transformers.m';
import { EspnClient } from '@sports-ui/ui-sdk/espn';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  private sport = FantasySports.Baseball;

  constructor(private client: EspnService, private apiService: ApiService) {}

  /**
   * Return fantasy baseball league
   *
   * @param leagueId
   * @param year
   * @returns
   */
  baseballLeague(leagueId: string, year: string): Observable<BaseballLeague> {
    return this.client.fetchFantasyLeagueBySport<EspnClient.BaseballLeague>({ sport: this.sport, leagueId, year }).pipe(
      map(res => {
        const genericLeagueSettings = EspnTransformers.clientLeagueToLeague(res);
        return FantasyBaseballTransformers.clientLeagueToBaseballLeague(res, genericLeagueSettings);
      })
    );
  }

  /**
   * Return games for current date
   *
   * @returns
   */
  baseballEvents(): Observable<BaseballEvent[]> {
    return this.client
      .fetchFantasyLeagueEvents({ sport: this.sport })
      .pipe(map(res => res.events.map(e => FantasyBaseballTransformers.clientEventToBaseballEvent(e))));
  }

  /**
   * Return baseball player latest news
   *
   * @param payload
   * @returns
   */
  baseballPlayerNews(playerId: string): Observable<PlayerNews[]> {
    return this.client.fetchFantasyPlayerNewsBySport({ sport: this.sport, lookbackDays: '30', playerId }).pipe(map(res => res));
  }

  /**
   * Return fantasy baseball league free agents
   *
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
    return this.client
      .fetchFantasyFreeAgentsBySport(this.sport, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyBaseballTransformers.transformEspnFreeAgentToBaseballPlayer(res.players)));
  }

  /**
   * Return Batter vs Pitcher matchup stats
   *
   * @param batterIds
   * @returns
   */
  baseballBatterVsPitcher({ batterIds }: { batterIds: string[] }) {
    const endpoint = new EspnEndpointBuilder(this.sport);
    let params = new HttpParams();

    batterIds.map(id => {
      params = params.append(EspnParamFragment.BatterId, id);
    });

    params = params.append(EspnParamFragment.Date, espnDateFormatter({ date: new Date().getTime() }));

    return this.apiService.get(endpoint.baseballStatsBatterVsPitcher, { params }).pipe(map(res => res));
  }
}
