import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from '../../../../node_modules/moment';

import { ApiService } from 'src/app/@shared/services/api.service';
import { League } from './models';

export enum Sports {
  mlb = 'flb',
  nfl = 'ffl',
}

@Injectable({
  providedIn: 'root'
})

export class EspnService {

  private fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) { }

  getLeague = (leagueId: number, sport: Sports) =>
    this.api.get<League>(`${this.fantasyBase}/games/${sport}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`,
      { params: this.params }
    );

  private get params() {
    let params = new HttpParams();
    params = params.append('scoringPeriodId', this.currentYear);
    params = params.append('view', 'mLiveScoring');
    params = params.append('view', 'mMatchupScore');
    params = params.append('view', 'mRoster');
    params = params.append('view', 'mStandings');
    params = params.append('view', 'mScoreboard');
    params = params.append('view', 'mPendingTransactions');
    params = params.append('view', 'mStatus');
    params = params.append('view', 'mTeam');
    params = params.append('view', 'mTransactions2');
    return params;
  }

  private get currentYear(): string {
    return moment().format('YYYY');
  }

}
