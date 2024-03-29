import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient } from '@sports-ui/ui-sdk/espn';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DateHelper } from '@app/@shared/helpers/date-helper';
import { clientFastcastToFastcast } from '@app/espn-fastcast/transformers/espn-fastcast.transformers';
import { FreeAgent, ProTeamSchedule } from '@sports-ui/ui-sdk/espn-client';
import { SportsEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';
import {
  BaseEspnEndpointBuilder,
  ESPN_PARAM_FRAGMENTS,
  ESPN_VIEW_PARAM_FRAGMENTS,
  ESPN_VIEW_PARAM_FRAGMENTS_LIST,
  FantasySportsAbbreviation,
} from '../endpoint-builder/base-espn-endpoints-builder.m';
import { PlayerNews } from '../models/player-news.model';
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
    const dateHelper = new DateHelper();

    const oneWeekAgoFromToday = dateHelper.formatWithDelimiter({ date: dateHelper.oneWeekAgoFromToday.getTime() });
    const oneWeekFromToday = dateHelper.formatWithDelimiter({ date: dateHelper.oneWeekFromToday.getTime() });

    const dateRange = `${oneWeekAgoFromToday}-${oneWeekFromToday}`;

    const params = new HttpParams()
      .set(ESPN_PARAM_FRAGMENTS.UseMap, true)
      .set(ESPN_PARAM_FRAGMENTS.Dates, dateRange)
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
  ): Observable<{ players: FreeAgent[] }> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId }).fantasyLeague;
    const params = new HttpParams()
      .set(ESPN_PARAM_FRAGMENTS.ScoringPeriod, scoringPeriod.toString())
      .set(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PlayerInfo);
    return this.get<{ players: FreeAgent[] }>(endpoint, { params, headers });
  }

  /**
   * Fetches the pro team schedules for a given fantasy sport and year.
   *
   * @description This is used to determine the pro team schedule for a given fantasy sport and year.
   *
   * @param {FantasySportsAbbreviation} sport - The fantasy sport abbreviation, e.g. NFL, NBA, etc.
   * @param {string} year - The year of the fantasy season, e.g. 2021, 2022, etc.
   * @returns {Observable<ProTeamSchedule>} An observable that emits the pro team schedule data.
   */
  protected fetchProteamSchedules(sport: FantasySportsAbbreviation, year: string) {
    const endpoint = BaseEspnEndpointBuilder({ sport, year }).fantasyBaseV3WithFragments;
    const params = new HttpParams().set(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.ProTeamSchedules);
    return this.get<ProTeamSchedule>(endpoint, { params });
  }

  /**
   * Fastcast
   *
   * @param url
   * @returns
   */
  fetchFastcast(url: string): Observable<FastcastTransform> {
    return this.get<{ sports: SportsEntity[] }>(url).pipe(map(res => clientFastcastToFastcast(res)));
  }

  /**
   * Verify league
   * @param sport
   * @param leagueId
   * @param year
   * @returns
   */
  verifyLeague(sport: FantasySportsAbbreviation, leagueId: string, year: string): Observable<EspnClient.League> {
    const endpoint = BaseEspnEndpointBuilder({ sport, leagueId, year }).fantasyLeague;
    return this.get<EspnClient.League>(endpoint);
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
    return this.get<{ sports: SportsEntity[] }>(endpoint).pipe(map(res => clientFastcastToFastcast(res)));
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
    ESPN_VIEW_PARAM_FRAGMENTS_LIST.filter(
      param => param !== ESPN_VIEW_PARAM_FRAGMENTS.PlayerCard && param !== ESPN_VIEW_PARAM_FRAGMENTS.ProTeamSchedules
    ).map(fragment => {
      params = params.append(ESPN_PARAM_FRAGMENTS.View, fragment);
    });
    return params;
  }
}
