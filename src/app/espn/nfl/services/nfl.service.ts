import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { API_BASE, FANTASY_BASE } from '@app/espn/espn.const';
import { EspnClientEventList, EspnClientLeague } from '@app/espn/mlb/interface';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NflService {
  private readonly currentYear = new Date().getFullYear();
  private readonly fantasyBase = `${FANTASY_BASE}/games/flb/seasons/${this.currentYear}/segments/0/leagues/`;

  constructor(private api: ApiService) {}

  fetchFootballLeague = (leagueId: number) => {
    const fantasyLeague$ = this._footballLeague(leagueId);
    const games$ = this._footballEvents();
    return forkJoin([fantasyLeague$, games$]);
  };

  /**
   * @todo
   * @param leagueId
   * @returns
   */
  private readonly _footballLeague = (leagueId: number) =>
    this.api.get<EspnClientLeague>(this.fantasyBase + leagueId, {
      params: this.params,
    });

  /**
   * Retrieve games for current date
   *
   * @description Fetches espn fantasy api for current games for today
   * @returns list of events
   */
  private readonly _footballEvents = () =>
    this.api.get<EspnClientEventList>(`${API_BASE}/games/flb/games`, { params: this.footballEventParams });

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
  private get footballEventParams() {
    let params = new HttpParams();
    params = params.append('useMap', 'true');
    params = params.append('dates', currentDate());
    return params;
  }
}
