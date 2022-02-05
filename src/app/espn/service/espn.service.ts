import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { flatten } from '@app/@shared/helpers/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnClientLeague } from '../espn-client.model';
import { NO_LOGO } from '../espn.const';
import {
  EspnEndpointBuilder,
  EspnParamFragment,
  EspnViewParamFragment,
  espnViewParamFragmentList,
  FantasySports,
} from '../models/espn-endpoint-builder.model';
import {
  CompetitorsEntity as CompetitorsImport,
  EspnClientFastcast as FastCastImport,
  EventsEntity as EventsImport,
  LeaguesEntity as LeaguesImport,
  Situation as SituationImport,
  SportsEntity as SportsImport,
} from '../models/espn-fastcast.model';
import { EspnClientOneFeed, FeedArticle as FeedArticleImport } from '../models/espn-onefeed.model';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { FeedArticle } from '../models/feed.model';
import { League } from '../models/league.model';

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

  static transformLeagueImportEventImport = (
    sportsImport: SportsImport[]
  ): { transformLeaguesImportToLeagues: League[]; transformEventImportToFastcastEvent: FastcastEvent[] } => {
    const leagues = sportsImport.filter(s => s.slug !== 'tennis' && s.slug !== 'golf' && s.slug !== 'mma').map(i => i.leagues);

    const flattenLeaguesImport = flatten(leagues);

    const transformLeaguesImportToLeagues = EspnService.transformLeaguesImportToLeagues(flattenLeaguesImport);

    const events = flattenLeaguesImport.map(l => l.events);

    const flattenEventsImport = flatten(events);

    const transformEventImportToFastcastEvent = EspnService.transformEventImportToFastcastEvent(flattenEventsImport);

    return {
      transformLeaguesImportToLeagues,
      transformEventImportToFastcastEvent,
    };
  }

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
      if (!val.homeAway) {
        return null;
      }

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
  }

  static transformDownDistancePostitionText = (downDistanceText: string | null, possessionText: string | null): string | null => {
    if (downDistanceText && possessionText) {
      return `${downDistanceText}, ${possessionText}`;
    }
    return null;
  }

  static transformUidToId(uid: string): string | null {
    if (!uid) {
      return null;
    }
    return uid.split('~')[1].replace('l:', '');
  }

  static transformEventImportToFastcastEvent = (eventsImport: EventsImport[]): FastcastEvent[] =>
    eventsImport.map(event => ({
      id: event.id,
      leagueId: EspnService.transformUidToId(event?.uid),
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
    }))

  static transformLeaguesImportToLeagues = (leaguesImport: LeaguesImport[]): League[] =>
    leaguesImport.map(l => ({
      id: l.id,
      uid: l.uid,
      name: l.name,
      abbreviation: l.abbreviation ?? l.name,
      shortName: l.shortName ?? l.name,
    }))

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
  espnUpdateFantasyTeam(payload: unknown, sport: FantasySports, leagueId: number): Observable<unknown> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    return this.api.post(endpoint.fantasyPlayerTransaction, payload, {
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
  espnFantasyLeagueBySport(sport: FantasySports, leagueId: number): Observable<EspnClientLeague> {
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
  espnFantasyPlayerNewsBySport(sport: FantasySports, numDays: number, playerId: number): Observable<unknown> {
    const endpoint = new EspnEndpointBuilder(sport);
    const params = new HttpParams().set(EspnParamFragment.Days, numDays.toString()).set(EspnParamFragment.PlayerId, playerId.toString());
    return this.api.get(endpoint.fantasyPlayerNews, { params });
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
  espnFantasyFreeAgentsBySport(sport: FantasySports, leagueId: number, scoringPeriod: number, headers: HttpHeaders): Observable<unknown> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = new HttpParams()
      .set(EspnParamFragment.ScoringPeriod, scoringPeriod.toString())
      .set(EspnParamFragment.View, EspnViewParamFragment.PlayerInfo);
    return this.api.get(endpoint.fantasyLeague, { params, headers });
  }

  /**
   * Fastcast
   *
   * @param url
   * @returns
   */
  espnFastcast(
    url: string
  ): Observable<{ transformLeaguesImportToLeagues: League[]; transformEventImportToFastcastEvent: FastcastEvent[] }> {
    return this.api.get<FastCastImport>(url).pipe(map(res => EspnService.transformLeagueImportEventImport(res.sports)));
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

        return feedOverviews.map(i => EspnService.transformFeedArticleImportToFeedArticle(i));
      })
    );
  }

  /**
   * @todo
   */
  private get postHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Cookie', 'ESPN-ONESITE.WEB-PROD.token');
    return headers;
  }

  /**
   * @todo
   */
  private get espnEventParams(): HttpParams {
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
