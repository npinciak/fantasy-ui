import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient, EspnFastcastClient } from '@sports-ui/ui-sdk/espn';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BaseEspnEndpointBuilder,
  ESPN_PARAM_FRAGMENTS,
  ESPN_VIEW_PARAM_FRAGMENTS,
  ESPN_VIEW_PARAM_FRAGMENTS_LIST,
  FantasySportsAbbreviation,
} from '../endpoint-builder/base-espn-endpoints-builder.m';
import { PlayerNews } from '../models/player-news.model';
import { EspnTransformers } from '../transformers/espn-transformers.m';
import { clientPlayerNewsFeed } from '../transformers/espn.transformers';

export type FantasyLeagueBySportRequest = {
  sport: FantasySportsAbbreviation;
  leagueId: string;
  year: string;
  headers?: HttpHeaders;
};

export type FantasyLeagueEventsRequest = Pick<FantasyLeagueBySportRequest, 'sport' | 'headers'>;
export type FantasyPlayerNewsRequest = Pick<FantasyLeagueBySportRequest, 'sport'> & { lookbackDays: string; playerId: string };

@Injectable({
  providedIn: 'root',
})
export class EspnService extends ApiService {
  /**
   * Update Espn Fantasy Team
   *
   * @param payload
   * @param leagueId
   * @returns
   */
  protected updateFantasyTeam(payload: unknown, sport: FantasySportsAbbreviation, leagueId: string): Observable<unknown> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId }).fantasyPlayerTransaction;
    return this.post(endpoint, payload, {
      withCredentials: true,
      headers: this.postHeaders,
    });
  }

  /**
   * Retrieve Espn Fantasy League
   *
   * @param leagueId
   * @param sport
   * @returns EspnLeague
   */
  protected fetchFantasyLeagueBySport<T>({ sport, leagueId, year, headers }: FantasyLeagueBySportRequest): Observable<T> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId, year }).fantasyLeague;
    return this.get<T>(endpoint, { params: this.params, headers });
  }

  /**
   * Retrieve Espn Fantasy player stat card
   *
   * @param leagueId
   * @param sport
   * @returns EspnLeague
   */
  protected fetchFantasyPlayerCardBySport<T>(
    { sport, leagueId, year, headers }: FantasyLeagueBySportRequest,
    scoringPeriodId: string
  ): Observable<T> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId, year }).fantasyLeague;
    const params = new HttpParams()
      .set(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PlayerCard)
      .set(ESPN_PARAM_FRAGMENTS.ScoringPeriod, scoringPeriodId);
    return this.get<T>(endpoint, { params, headers });
  }

  /**
   * Retrieve Espn Fantasy League events
   *
   * @param leagueId
   * @param sport
   * @returns EspnLeague
   */
  protected fetchFantasyLeagueEvents({ sport, headers }: FantasyLeagueEventsRequest): Observable<EspnClient.EventList> {
    const endpoint = BaseEspnEndpointBuilder({ sport }).espnEvents;
    const params = new HttpParams()
      .set(ESPN_PARAM_FRAGMENTS.UseMap, true)
      .set(ESPN_PARAM_FRAGMENTS.Dates, espnDateFormatter({ date: new Date().getTime() }))
      .set(ESPN_PARAM_FRAGMENTS.PbpOnly, true);
    return this.get<EspnClient.EventList>(endpoint, { params, headers });
  }

  /**
   * Fetch player news
   *
   * @param lookbackDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  protected fetchFantasyPlayerNewsBySport({ sport, lookbackDays, playerId }: FantasyPlayerNewsRequest): Observable<PlayerNews> {
    const endpoint = BaseEspnEndpointBuilder({ sport }).fantasyPlayerNews;
    const params = new HttpParams().set(ESPN_PARAM_FRAGMENTS.Days, lookbackDays).set(ESPN_PARAM_FRAGMENTS.PlayerId, playerId);
    return this.get<EspnClient.PlayerNewsFeed>(endpoint, { params }).pipe(map(res => clientPlayerNewsFeed(playerId, res)));
  }

  /**
   * Retrieve league free agents
   *
   * @description Filter players via HttpHeader
   *
   * @param leagueId League Id
   * @param sport
   * @param headers 'X-Fantasy-Filter' header required
   * @returns List of free agents
   */
  protected fetchFantasyFreeAgentsBySport(
    sport: FantasySportsAbbreviation,
    leagueId: string,
    scoringPeriod: string,
    headers: HttpHeaders
  ): Observable<{ players: EspnClient.FreeAgent[] }> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId }).fantasyLeague;
    const params = new HttpParams()
      .set(ESPN_PARAM_FRAGMENTS.ScoringPeriod, scoringPeriod.toString())
      .set(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PlayerInfo);
    return this.get<{ players: EspnClient.FreeAgent[] }>(endpoint, { params, headers });
  }

  /**
   * Fastcast
   *
   * @param url
   * @returns
   */
  fetchFastcast(url: string): Observable<FastcastTransform> {
    return this.get<EspnFastcastClient.EspnClientFastcast>(url).pipe(map(res => EspnTransformers.clientFastcastToFastcast(res)));
  }

  /**
   * Static Fastcast
   *
   * @returns
   */
  fetchStaticScoreboard(opts?: {
    sport: string | null;
    league: string | null;
    weeks: number | null;
    seasontype: number | null;
  }): Observable<FastcastTransform> {
    const endpoint = BaseEspnEndpointBuilder({}).staticScoreboard;
    return this.get<EspnFastcastClient.EspnClientFastcast>(endpoint).pipe(map(res => EspnTransformers.clientFastcastToFastcast(res)));
  }

  /**
   * Send espn server cookie in headers for POST
   */
  private get postHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Cookie', 'ESPN-ONESITE.WEB-PROD.token');
    return headers;
  }

  /**
   * Append all query params to http request
   */
  private get params(): HttpParams {
    let params = new HttpParams();
    ESPN_VIEW_PARAM_FRAGMENTS_LIST.filter(param => param !== ESPN_VIEW_PARAM_FRAGMENTS.PlayerCard).map(fragment => {
      params = params.append(ESPN_PARAM_FRAGMENTS.View, fragment);
    });
    return params;
  }
}
