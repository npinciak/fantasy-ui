import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { currentDate } from 'src/app/@shared/helpers/date';

import { ApiService } from 'src/app/@shared/services/api.service';
import { League, Player } from './models/mlb/interface';

export enum Sports {
  baseball = 'flb',
  football = 'ffl',
}

@Injectable({
  providedIn: 'root'
})

export class EspnService {

  private readonly fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private readonly apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) { }

  fetchEspnBaseball = (leagueId: number) => {
    const $fantasyLeague = this._baseballLeague(leagueId);
    const $games = this._baseballEvents();
    return forkJoin([$fantasyLeague, $games]);
  };


  updateTeam = (payload: unknown, leagueId: number) =>
    this.api.post<any>(`${this.fantasyBase}/games/flb/seasons/2021/segments/0/leagues/${leagueId}/transactions`, payload, {
      withCredentials: true, headers: this.postHeaders
    });


  private readonly _baseballLeague = (leagueId: number) =>
    this.api.get<League>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`,
      { params: this.params }
    );

  private readonly _getBaseballPlayerNews = (days: number, playerId: number) =>
    this.api.get<any>(`${this.apiBase}/fantasy/v2/games/${Sports.baseball}/news/players`, {
      params: new HttpParams().set('days', days.toString()).set('playerId', playerId.toString())
    });

  getBaseballFA = (leagueId: number) =>
    this.api.get<any>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`,
      {
        params: this.faParams,
        // header: new HttpHeaders({
        //   // eslint-disable-next-line @typescript-eslint/naming-convention
        //   'Content-Type': 'application/json',
        //   // eslint-disable-next-line @typescript-eslint/naming-convention
        //   'X-Fantasy-Filter': null,
        // })
      }
    );

  /**
   * Retrieve games for current date
   *
   * @description Fetches espn fantasy api for current games for today
   * @returns list of events
   */
  private readonly _baseballEvents = () =>
    this.api.get<EventList>(`${this.apiBase}/fantasy/v2/games/${Sports.baseball}/games`, {

      params: this.baseballEventParams
    });
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
  private get faParams() {
    let params = new HttpParams();
    params = params.append('view', 'kona_player_info');
    return params;
  }


  private get params() {
    let params = new HttpParams();
    // params = params.append('scoringPeriodId', '26');
    params = params.append('view', 'mLiveScoring');
    params = params.append('view', 'mMatchupScore');
    params = params.append('view', 'mRoster');
    params = params.append('view', 'mStandings');
    params = params.append('view', 'mScoreboard');
    params = params.append('view', 'mPendingTransactions');
    params = params.append('view', 'mStatus');
    params = params.append('view', 'mTeam');
    // params = params.append('view', 'mTransactions2');
    return params;
  }

  private get currentYear() {
    return new Date().getFullYear();
  }

}
