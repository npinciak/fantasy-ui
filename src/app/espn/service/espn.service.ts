import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnTransformers } from '../espn.transformers';
import {
  EspnEndpointBuilder,
  EspnParamFragment,
  EspnViewParamFragment,
  espnViewParamFragmentList,
  FantasySports,
} from '../models/espn-endpoint-builder.model';

import { EspnFastcastClient } from 'sports-ui-sdk/lib/models/espn-fastcast.model';

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  constructor(private api: ApiService) {}

  /**
   * Update Espn Fantasy Team
   *
   * @param payload
   * @param leagueId
   * @returns
   */
  updateFantasyTeam(payload: unknown, sport: FantasySports, leagueId: string): Observable<unknown> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    return this.api.post(endpoint.fantasyPlayerTransaction, payload, {
      withCredentials: true,
      headers: this.postHeaders,
    });
  }

  /**
   * Retrieve Espn Fantasy League
   *
   * @param leagueId
   * @param sport
   * @returns EspnClientLeague
   */
  fetchFantasyLeagueBySport<T>(data: { sport: FantasySports; leagueId: string; year: string; headers?: HttpHeaders }): Observable<T> {
    const endpoint = new EspnEndpointBuilder(data.sport, data.leagueId, data.year);
    return this.api.get<T>(endpoint.fantasyLeague, { params: this.params, headers: data.headers });
  }

  /**
   * Retrieve Espn Fantasy League
   *
   * @param leagueId
   * @param sport
   * @returns EspnClientLeague
   */
  fetchFantasyLeagueEvents(sport: FantasySports, headers?: HttpHeaders): Observable<EspnClient.EventList> {
    const endpoint = new EspnEndpointBuilder(sport);
    const params = new HttpParams()
      .set(EspnParamFragment.UseMap, true)
      .set(EspnParamFragment.Dates, currentDate(''))
      .set(EspnParamFragment.PbpOnly, true);
    return this.api.get<EspnClient.EventList>(endpoint.espnEvents, { params, headers });
  }

  /**
   * Fetch player news
   *
   * @param lookbackDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  fetchFantasyPlayerNewsBySport(data: { sport: FantasySports; lookbackDays: string; playerId: string }): Observable<EspnClient.PlayerNews> {
    const endpoint = new EspnEndpointBuilder(data.sport);
    const params = new HttpParams().set(EspnParamFragment.Days, data.lookbackDays).set(EspnParamFragment.PlayerId, data.playerId);
    return this.api.get<EspnClient.PlayerNews>(endpoint.fantasyPlayerNews, { params });
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
  fetchFantasyFreeAgentsBySport(
    sport: FantasySports,
    leagueId: string,
    scoringPeriod: number,
    headers: HttpHeaders
  ): Observable<{ players: EspnClient.FreeAgent[] }> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = new HttpParams()
      .set(EspnParamFragment.ScoringPeriod, scoringPeriod.toString())
      .set(EspnParamFragment.View, EspnViewParamFragment.PlayerInfo);

    return this.api.get<{ players: EspnClient.FreeAgent[] }>(endpoint.fantasyLeague, { params, headers });
  }

  /**
   * Fastcast
   *
   * @param url
   * @returns
   */
  fetchFastcast(url: string): Observable<FastcastTransform> {
    return this.api.get<EspnFastcastClient.EspnClientFastcast>(url).pipe(map(res => EspnTransformers.clientFastcastToFastcast(res)));
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
    const endpoint = new EspnEndpointBuilder();

    return this.api
      .get<EspnFastcastClient.EspnClientFastcast>(endpoint.staticScoreboard)
      .pipe(map(res => EspnTransformers.clientFastcastToFastcast(res)));
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
    espnViewParamFragmentList.map(fragment => {
      params = params.append(EspnParamFragment.View, fragment);
    });
    return params;
  }
}
