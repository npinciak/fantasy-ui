import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatten } from '@app/@shared/helpers/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import { EspnClientFreeAgent, EspnClientLeague, GameStatusId } from '../espn-client.model';
import { includeSports, transformDownDistancePositionText, transformUidToId } from '../espn-helpers';
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
import { FastcastEventTeamMap } from '../models/fastcast-team.model';
import { FeedArticle } from '../models/feed.model';
import { League } from '../models/league.model';

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  constructor(private api: ApiService) {}

  static transformLeagueImportEventImport(sportsImport: SportsImport[]): {
    transformLeaguesImportToLeagues: League[];
    transformEventImportToFastcastEvent: FastcastEvent[];
  } {
    const leagues = sportsImport.filter(s => includeSports(s.id)).map(i => i.leagues);

    const flattenLeaguesImport = flatten(leagues);

    const transformLeaguesImportToLeagues = flattenLeaguesImport.map(league => EspnService.transformLeaguesImportToLeagues(league));

    const events = flattenLeaguesImport.map(l => l.events);

    const flattenEventsImport = flatten(events);

    const transformEventImportToFastcastEvent = EspnService.transformEventImportToFastcastEvent(flattenEventsImport);

    return {
      transformLeaguesImportToLeagues,
      transformEventImportToFastcastEvent,
    };
  }

  static transformFastcastCompetitorsToTeams(data: CompetitorsImport[], situation: SituationImport): FastcastEventTeamMap {
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
        record: Array.isArray(val.record) ? null : val.record,
        rank: val.rank ?? null,
        winPct: null,
        aggregateScore: val.aggregateScore ?? null,
        hasPossession: situation?.possession === val.id,
        isRedzone: (situation?.possession === val.id && situation?.isRedZone) ?? false,
      };
      return acc;
    }, {});
  }

  static transformEventImportToFastcastEvent(eventsImport: EventsImport[]): FastcastEvent[] {
    return eventsImport.map(event => ({
      id: event.id,
      leagueId: transformUidToId(event?.uid),
      timestamp: new Date(event.date).getTime(),
      state: event.fullStatus.type.state,
      completed: event.fullStatus.type.completed,
      status: event.status,
      name: event.name,
      shortname: event.shortName,
      location: event.location,
      clock: event.clock,
      summary: event.summary,
      period: event.period,
      note: event.note,
      teams: EspnService.transformFastcastCompetitorsToTeams(event.competitors, event.situation),
      isHalftime: event.fullStatus.type?.id ? Number(event.fullStatus?.type?.id) === GameStatusId.Halftime : false,
      downDistancePositionText: transformDownDistancePositionText(event.situation?.shortDownDistanceText, event.situation?.possessionText),
      lastPlay: event.situation?.lastPlay ?? null,
    }));
  }

  static transformLeaguesImportToLeagues(leaguesImport: LeaguesImport): League {
    return {
      id: leaguesImport.id,
      uid: leaguesImport.uid,
      name: leaguesImport.name,
      abbreviation: leaguesImport.abbreviation ?? leaguesImport.name,
      shortName: leaguesImport.shortName ?? leaguesImport.name,
      isTournament: leaguesImport.isTournament,
      sport: null,
    };
  }

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
  espnFantasyLeagueBySport(sport: FantasySports, leagueId: number, headers?: HttpHeaders): Observable<EspnClientLeague> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId, 2022);
    return this.api.get<EspnClientLeague>(endpoint.fantasyLeague, { params: this.params, headers });
  }

  /**
   * Fetch player news
   *
   * @param lookbackDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  espnFantasyPlayerNewsBySport(data: { sport: FantasySports; lookbackDays: string; playerId: string }): Observable<unknown> {
    const endpoint = new EspnEndpointBuilder(data.sport);
    const params = new HttpParams().set(EspnParamFragment.Days, data.lookbackDays).set(EspnParamFragment.PlayerId, data.playerId);
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
  espnFantasyFreeAgentsBySport(
    sport: FantasySports,
    leagueId: number,
    scoringPeriod: number,
    headers: HttpHeaders
  ): Observable<{ players: EspnClientFreeAgent[] }> {
    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = new HttpParams()
      .set(EspnParamFragment.ScoringPeriod, scoringPeriod.toString())
      .set(EspnParamFragment.View, EspnViewParamFragment.PlayerInfo);
    return this.api.get<{ players: EspnClientFreeAgent[] }>(endpoint.fantasyLeague, { params, headers });
  }

  /**
   * Fastcast
   *
   * @param url
   * @returns
   */
  espnFastcast(url: string): Observable<FastcastTransform> {
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
  private get params(): HttpParams {
    let params = new HttpParams();
    espnViewParamFragmentList.map(fragment => {
      params = params.append(EspnParamFragment.View, fragment);
    });
    return params;
  }
}

export type FastcastTransform = { transformLeaguesImportToLeagues: League[]; transformEventImportToFastcastEvent: FastcastEvent[] };
