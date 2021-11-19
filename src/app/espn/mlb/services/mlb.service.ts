import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { Sports } from '@app/espn/espn.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspnClientLeague, EspnClientEventList, EspnClientEvent } from '../interface';
import { BaseballLeague } from '../models/baseball-league.model';
import { MlbEvent } from '../models/mlb-event.model';

const transformEspnClientLeagueToBaseballLeague = (espnLeague: EspnClientLeague): BaseballLeague => ({ ...espnLeague });
// TODO create new FE MlbEvent Model
const transformEspnClientEventListToMlbEventList = (espnEvents: EspnClientEvent[]): MlbEvent[] => espnEvents.map(event => event);

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  private readonly fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private readonly apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) {}

  fetchEspnBaseball = (leagueId: number) => {
    const $fantasyLeague = this.baseballLeague(leagueId);
    const $games = this.baseballEvents();
    return forkJoin([$fantasyLeague, $games]);
  };

  /**
   * Retrieve league information
   *
   * @param leagueId League Id
   * @returns League object
   */
  baseballLeague = (leagueId: number): Observable<BaseballLeague> =>
    this.api
      .get<EspnClientLeague>(`${this.fantasyBase}/games/${Sports.baseball}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`, {
        params: this.params,
      })
      .pipe(map(res => transformEspnClientLeagueToBaseballLeague(res)));

  /**
   * Retrieve games for current date
   *
   * @description Fetches espn fantasy api for current games for today
   * @returns list of events
   */
  baseballEvents = (): Observable<MlbEvent[]> =>
    this.api
      .get<EspnClientEventList>(`${this.apiBase}/fantasy/v2/games/${Sports.baseball}/games`, {
        params: this.baseballEventParams,
      })
      .pipe(map(res => transformEspnClientEventListToMlbEventList(res.events)));

  /**
   * @todo
   */
  private get baseballEventParams() {
    let params = new HttpParams();
    params = params.append('useMap', 'true');
    params = params.append('dates', '20210809'); //currentDate());
    // params = params.append('pbpOnly', 'true');
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
