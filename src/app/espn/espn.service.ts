import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from 'src/app/@shared/helpers/date';

import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnClientEventList, EspnClientLeague } from './espn-client.model';

export enum Sports {
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  private readonly fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private readonly apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) {}

  updateTeam = (payload: unknown, leagueId: number) =>
    this.api.post<any>(`${this.fantasyBase}/games/flb/seasons/2021/segments/0/leagues/${leagueId}/transactions`, payload, {
      withCredentials: true,
      headers: this.postHeaders,
    });

  /**
   * Retrieve Espn Fantasy League
   *
   * @param leagueId
   * @param sport
   * @returns
   */
  espnFantasyLeagueBySport = (leagueId: number, sport: Sports) =>
    this.api.get<EspnClientLeague>(`${this.fantasyBase}/games/${sport}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`, {
      params: this.params,
    });

  /**
   * Fetch player news
   *
   * @param numDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  espnFantasyPlayerNewsBySport = (numDays: number, playerId: number, sport: Sports) =>
    this.api.get<any>(`${this.apiBase}/fantasy/v2/games/${sport}/news/players`, {
      params: new HttpParams().set('days', numDays.toString()).set('playerId', playerId.toString()),
    });

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
  espnFantasyFreeAgentsBySport = (leagueId: number, sport: Sports, headers: HttpHeaders) =>
    this.api.get<any>(`${this.fantasyBase}/games/${sport}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`, {
      params: this.faParams,
      headers,
    });

  /**
   * Retrieve games for current date
   *
   * @description Fetches espn fantasy api for current games for today
   *
   * @param sport
   *
   * @returns list of events
   */
  espnFantasyEventsBySport = (sport: Sports) =>
    this.api.get<EspnClientEventList>(`${this.apiBase}/fantasy/v2/games/${sport}/games`, {
      params: this.espnEventParams,
    });

  /**
   * @todo
   */
  private get postHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Cookie', 'ESPN-ONESITE.WEB-PROD.token');
    return headers;
  }

  /**
   * @todo
   */
  private get espnEventParams() {
    let params = new HttpParams();
    params = params.append('useMap', 'true');
    params = params.append('dates', '20211125'); // currentDate());
    return params;
  }

  /**
   * @todo
   */
  private get faParams() {
    let params = new HttpParams();
    params = params.append('scoringPeriodId', '26');
    params = params.append('view', 'kona_player_info');
    return params;
  }

  /**
   * @todo
   */
  private get params() {
    let params = new HttpParams();
    params = params.append('view', 'mLiveScoring');
    params = params.append('view', 'mMatchupScore');
    params = params.append('view', 'mRoster');
    params = params.append('view', 'mScoreboard');
    params = params.append('view', 'mTeam');
    return params;
  }

  /**
   * @todo
   */
  private get currentYear() {
    return new Date().getFullYear();
  }
}
