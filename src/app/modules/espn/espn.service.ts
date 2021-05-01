import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  private fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) { }

  getBaseballLeague = (leagueId: number) =>
    this.api.get<League>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`,
      { params: this.params }
    );

  getBaseballPlayerNews = (days: number, playerId: number) =>
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
