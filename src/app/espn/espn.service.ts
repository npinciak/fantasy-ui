import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { currentDate } from 'src/app/@shared/helpers/date';

import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnClientEventList, EspnClientLeague } from './espn-client.model';
import {
  CompetitorsEntity as CompetitorsImport,
  EspnClientFastcast as FastCastImport,
  EventsEntity as EventsImport,
  LeaguesEntity as LeaguesImport,
  Situation as SituationImport,
  SportsEntity as SportsImport,
} from './models/espn-fastcast.model';
import { FANTASY_BASE_V2, FANTASY_BASE_V3, NO_LOGO, ONE_FEED_BASE } from './espn.const';
import { FastcastEvent } from './models/fastcast-event.model';
import { FastcastEventTeam } from './models/fastcast-team.model';
import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { Observable } from 'rxjs';
import { EspnClientOneFeed, FeedArticle as FeedArticleImport, FeedArticleType, FeedEntity } from './models/espn-onefeed.model';
import { flatten } from '@app/@shared/helpers/utils';
import { FeedArticle } from './models/feed.model';

export enum Sports {
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

export enum GameStatusId {
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

  static transformSportsImportToEventsImport = (sportsImport: SportsImport[]) => {
    const tmp: LeaguesImport[][] = [];

    for (let i = 0; i < sportsImport.length; i++) {
      tmp.push(sportsImport[i].leagues);
    }

    const leagues: LeaguesImport[] = flatten(tmp);

    const temp2: EventsImport[][] = [];

    for (let i = 0; i < leagues.length; i++) {
      temp2.push(leagues[i].events);
    }

    const flattenTemp: EventsImport[] = flatten(temp2);

    return leagues; //EspnService.transformEventImportToFastcastEvent(flattenTemp);
  };

  static transformFastcastCompetitorsToTeams = (
    data: CompetitorsImport[],
    situation: SituationImport | null
  ): { [homeAway: string]: FastcastEventTeam } => {
    const winPctMap: { home: number | null; away: number | null } = { home: null, away: null };

    if (!situation) {
      winPctMap.home = null;
      winPctMap.away = null;
    } else {
      winPctMap.home = situation.lastPlay?.probability?.homeWinPercentage;
      winPctMap.away = situation.lastPlay?.probability?.awayWinPercentage;
    }

    return data.reduce((acc, val) => {
      acc[val.homeAway] = {
        id: val.id,
        score: val.score,
        abbrev: val.abbreviation,
        logo: val.logo === '' ? NO_LOGO : val.logo,
        isWinner: val.winner,
        name: val.name ?? val.abbreviation,
        color: val.color === 'ffffff' || val.color === 'ffff00' ? '#1a1a1a' : `#${val.color}`,
        altColor: `#${val.alternateColor}`,
        record: val.record,
        rank: val.rank ?? null,
        winPct: winPctMap[val.homeAway],
        hasPossession: situation?.possession === val.id,
        isRedzone: (situation?.possession === val.id && situation?.isRedZone) ?? false,
      };
      return acc;
    }, {});
  };

  static transformDownDistancePostitionText = (downDistanceText: string | null, possessionText: string | null): string | null => {
    if (downDistanceText && possessionText) {
      return `${downDistanceText}, ${possessionText}`;
    }
    return null;
  };

  static transformEventImportToFastcastEvent = (events: EventsImport[]): FastcastEvent[] =>
    events.map(event => ({
      id: event.id,
      priority: event.priority,
      timestamp: new Date(event.date).getTime(),
      state: event.fullStatus.type.state,
      status: event.status,
      name: event.name,
      shortname: event.shortName,
      location: event.location,
      clock: event.clock,
      summary: event.summary,
      period: event.period,
      teams: EspnService.transformFastcastCompetitorsToTeams(event.competitors, event.situation),
      isHalftime: event.fullStatus.type?.id ? Number(event.fullStatus?.type?.id) === GameStatusId.Halftime : false,
      downDistancePositionText: EspnService.transformDownDistancePostitionText(
        event.situation?.shortDownDistanceText,
        event.situation?.possessionText
      ),
      lastPlay: event.situation?.lastPlay ?? null,
    }));

  static transformFeedArticleImportToFeedArticle(articleImport: FeedArticleImport): FeedArticle {
    return {
      id: articleImport.id.toString(),
      headline: articleImport.headline,
      description: articleImport.description,
      image: articleImport?.images[0]?.url ?? null,
      link: articleImport.links.web.href,
      published: articleImport.published,
      author: '',
    };
  }

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
   * Fastcast
   *
   * @param url
   * @returns
   */
  espnFastcast(url: string) {
    return this.api.get<FastCastImport>(url).pipe(map(res => EspnService.transformSportsImportToEventsImport(res.sports)));
  }

  /**
   * OneFeed
   *
   * @param url
   * @returns
   */
  espnOneFeed(offset: number = 0, limit: number = 20): Observable<FeedArticle[]> {
    const endpoint = new EspnEndpointBuilder();
    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());

    const league = 'nfl';

    return this.api.get<EspnClientOneFeed>(endpoint.oneFeed + `/leagues/${league}`, { params }).pipe(
      map(res => {
        const feeds: FeedArticleImport[][] = [];

        res.feed.map(f => {
          feeds.push(f.data.now);
        });

        const feedOverviews: FeedArticleImport[] = flatten(feeds);

        // const feeds2: FeedArticleImport[][] = [];
        // feedOverviews.map(f => feeds2.push(f));

        return feedOverviews.map(i => EspnService.transformFeedArticleImportToFeedArticle(i));

        // return (
        //   flatten(feeds2)
        //     // .filter(o => o.moduleType === FeedArticleType.Story)
        //
        // );
      })
    );
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
  private static oneFeedBase = ONE_FEED_BASE;

  private static year = new Date().getFullYear();

  private _leagueId: number;
  private _sport: Sports;

  constructor(sport?: Sports, leagueId?: number) {
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

  get oneFeed() {
    return `${EspnEndpointBuilder.oneFeedBase}/oneFeed`;
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
