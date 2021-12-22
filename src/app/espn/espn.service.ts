import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { currentDate } from 'src/app/@shared/helpers/date';

import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnClientEventList, EspnClientLeague } from './espn-client.model';
import { FANTASY_BASE_V2, FANTASY_BASE_V3, NO_LOGO } from './espn.const';
import { enumAsList } from '@app/@shared/helpers/enum-as-list';

export enum Sports {
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

enum GameStatusId {
  Scheduled = 1,
  '2nd' = 2,
  Cancelled = 5,
  EndOfPeriod = 22,
  FirstHalf = 25,
  Halftime = 23,
  FullTime = 28,
}

enum GameStatus {
  Scheduled = 'STATUS_SCHEDULED',
  FirstHalf = 'STATUS_FIRST_HALF',
  Halftime = 'STATUS_HALFTIME',
  SecondHalf = 'STATUS_SECOND_HALF',
  InProgress = 'STATUS_IN_PROGRESS',
  InProgressAlt = 'STATUS_IN_PROGRESS_2',
  RainDelay = 'STATUS_RAIN_DELAY',
  Postponed = 'STATUS_POSTPONED',
  Canceled = 'STATUS_CANCELED',
  Delayed = 'STATUS_DELAYED',
  EndOfPeriod = 'STATUS_END_PERIOD',
  FullTime = 'STATUS_FULL_TIME',
  Final = 'STATUS_FINAL',
  FinalPenalties = 'STATUS_FINAL_PEN',
  PreFight = 'STATUS_PRE_FIGHT',
  FightersIntro = 'STATUS_FIGHTERS_INTRODUCTION',
  FightersWalking = 'STATUS_FIGHTERS_WALKING',
  EndOfFight = 'STATUS_END_OF_FIGHT',
  EndOfRound = 'STATUS_END_OF_ROUND',
  TBD = 'STATUS_TBD',
  Uncontested = 'STATUS_UNCONTESTED',
  Abandoned = 'STATUS_ABANDONED',
  Forfeit = 'STATUS_FORFEIT',
}

export enum FastCastGameStatus {
  Post = 'post',
  Pre = 'pre',
  InProgress = 'in',
}

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
  espnUpdateFantasyTeam(payload: unknown, sport: Sports, leagueId: number) {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    return this.api.post<any>(endpoint.fantasyPlayerTransaction, payload, {
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
  espnFantasyLeagueBySport(sport: Sports, leagueId: number) {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    return this.api.get<EspnClientLeague>(endpoint.fantasyLeague, { params: this.params });
  }

  /**
   * Fetch player news
   *
   * @param numDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  espnFantasyPlayerNewsBySport(sport: Sports, numDays: number, playerId: number) {
    const endpoint = new EspnEndpointBuilder(sport);
    const params = new HttpParams().set(EspnParamFragment.Days, numDays.toString()).set(EspnParamFragment.PlayerId, playerId.toString());
    return this.api.get<any>(endpoint.fantasyPlayerNews, { params });
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
  espnFantasyFreeAgentsBySport(sport: Sports, leagueId: number, scoringPeriod: number, headers: HttpHeaders) {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = new HttpParams()
      .set(EspnParamFragment.ScoringPeriod, scoringPeriod.toString())
      .set(EspnParamFragment.View, EspnViewParamFragment.PlayerInfo);
    return this.api.get<any>(endpoint.fantasyLeague, { params, headers });
  }

  /**
   * Retrieve games for current date
   *
   * @deprecated fastcast service might replace this
   *
   * @description Fetches espn fantasy api for current games for today
   *
   * @param sport
   *
   * @returns list of events
   */
  espnFantasyEventsBySport(sport: Sports) {
    const endpoint = new EspnEndpointBuilder(sport);
    return this.api.get<EspnClientEventList>(endpoint.espnEvents, { params: this.espnEventParams });
  }


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
    params = params.append(EspnParamFragment.UseMap, 'true');
    params = params.append(EspnParamFragment.Dates, currentDate());
    return params;
  }

  /**
   * @todo
   */
  private get params(): HttpParams {
    let params = new HttpParams();
    espnViewParamFragmentList.map(fragment => {
      params = params.append(EspnParamFragment.View, fragment);
    });
    return params;
  }
}

export class EspnEndpointBuilder {
  private static fantasyBaseV3 = FANTASY_BASE_V3;
  private static fantasyBaseV2 = FANTASY_BASE_V2;
  private static year = new Date().getFullYear();

  private _leagueId: number;
  private _sport: Sports;

  constructor(sport: Sports, leagueId?: number) {
    this._leagueId = leagueId;
    this._sport = sport;
  }

  get fantasyPlayerNews() {
    return `${this.fantasyBaseV2WithFragments}/news/players`;
  }

  get espnEvents() {
    return `${this.fantasyBaseV2WithFragments}/games`;
  }

  get fantasyPlayerTransaction() {
    return `${this.fantasyLeague}/transactions`;
  }

  get fantasyLeague() {
    return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${this._leagueId}`;
  }

  private get fantasyBaseV3WithFragments() {
    return `${EspnEndpointBuilder.fantasyBaseV3}/games/${this._sport}/seasons/${EspnEndpointBuilder.year}`;
  }

  private get fantasyBaseV2WithFragments() {
    return `${EspnEndpointBuilder.fantasyBaseV2}/games/${this._sport}`;
  }
}

export enum EspnParamFragment {
  ScoringPeriod = 'scoringPeriodId',
  View = 'view',
  UseMap = 'useMap',
  Dates = 'dates',
  Days = 'days',
  PlayerId = 'playerId',
}

export enum EspnViewParamFragment {
  PlayerInfo = 'kona_player_info',
  LiveScoring = 'mLiveScoring',
  MatchupScore = 'mMatchupScore',
  Roster = 'mRoster',
  Scoreboard = 'mScoreboard',
  Team = 'mTeam',
}

export const espnViewParamFragmentList = enumAsList(EspnViewParamFragment);
