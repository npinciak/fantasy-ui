import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { currentDate } from 'src/app/@shared/helpers/date';

import { ApiService } from 'src/app/@shared/services/api.service';
import { Filter } from '@mlb/class';
import { EventList, League } from '@mlb/interface';

export enum Sports {
  baseball = 'flb',
  football = 'ffl',
}

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  private readonly fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private readonly apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) {}

  fetchEspnBaseball = (leagueId: number) => {
    const $fantasyLeague = this._baseballLeague(leagueId);
    const $games = this._baseballEvents();
    return forkJoin([$fantasyLeague, $games]);
  };

  updateTeam = (payload: unknown, leagueId: number) =>
    this.api.post<any>(`${this.fantasyBase}/games/flb/seasons/2021/segments/0/leagues/${leagueId}/transactions`, payload, {
      withCredentials: true,
      headers: this.postHeaders,
    });

  playerNews = (days: number, playerId: number) => this._baseballPlayerNews(days, playerId);

  freeAgents = (leagueId: number, headers: HttpHeaders) => this._baseballFreeAgents(leagueId, headers);

  /**
   * Retrieve league information
   *
   * @param leagueId League Id
   * @returns League object
   */
  private readonly _baseballLeague = (leagueId: number) =>
    this.api.get<League>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`, {
      params: this.params,
    });

  /**
   * Fetch player news
   *
   * @param days Days back for news
   * @param playerId Player Id
   * @returns Player news
   */
  private readonly _baseballPlayerNews = (days: number, playerId: number) =>
    this.api.get<any>(`${this.apiBase}/fantasy/v2/games/${Sports.baseball}/news/players`, {
      params: new HttpParams().set('days', days.toString()).set('playerId', playerId.toString()),
    });

  /**
   * Retrieve league free agents
   *
   * @description Filter players via HttpHeader
   *
   * @param leagueId League Id
   * @param headers 'X-Fantasy-Filter' header required
   * @returns List of free agents
   */
  private readonly _baseballFreeAgents = (leagueId: number, headers: HttpHeaders) =>
    this.api.get<any>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`, {
      params: this.faParams,
      headers,
    });

  /**
   * Retrieve games for current date
   *
   * @description Fetches espn fantasy api for current games for today
   * @returns list of events
   */
  private readonly _baseballEvents = () =>
    this.api.get<EventList>(`${this.apiBase}/fantasy/v2/games/${Sports.baseball}/games`, {
      params: this.baseballEventParams,
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
  private get baseballEventParams() {
    let params = new HttpParams();
    params = params.append('useMap', 'true');
    params = params.append('dates', currentDate());
    // params = params.append('pbpOnly', 'true');
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

    // params = params.append('view', 'mPendingTransactions');
    // params = params.append('scoringPeriodId','');
    // params = params.append('view', 'mStatus');
    // params = params.append('view', 'mTransactions2');
    return params;
  }

  /**
   * @todo
   */
  private get currentYear() {
    return new Date().getFullYear();
  }
}
