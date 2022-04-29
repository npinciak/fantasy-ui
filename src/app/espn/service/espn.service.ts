import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatten } from '@app/@shared/helpers/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import {
  CompetitorsEntity as CompetitorsImport,
  EspnClientFastcast as FastCastImport,
  EventsEntity as EventsImport,
  LeaguesEntity as LeaguesImport,
} from '../../espn-fastcast/models/espn-fastcast.model';
import { FastcastEvent, FootballSituation, MlbSituation } from '../../espn-fastcast/models/fastcast-event.model';
import { FastcastEventTeam } from '../../espn-fastcast/models/fastcast-team.model';
import { EspnClientFreeAgent, EspnClientLeague, GameStatusId } from '../espn-client.model';
import { includeSports, transformUidToId } from '../espn-helpers';
import {
  EspnEndpointBuilder,
  EspnParamFragment,
  EspnViewParamFragment,
  espnViewParamFragmentList,
  FantasySports,
} from '../models/espn-endpoint-builder.model';
import { EspnClientOneFeed, FeedArticle as FeedArticleImport } from '../models/espn-onefeed.model';
import { FeedArticle } from '../models/feed.model';
import { League } from '../models/league.model';

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  constructor(private api: ApiService) {}

  static transformLeagueImportToLeague(l: LeaguesImport | null): League | null {
    if (!l) {
      return null;
    }
    return {
      id: l.id,
      uid: l.uid,
      name: l.name,
      abbreviation: l.abbreviation ?? l.name,
      shortName: l.shortName ?? l.name,
      isTournament: l?.isTournament ?? false,
    };
  }

  static transformCompetitorToFastcastTeam(eventUid: string, data: CompetitorsImport): FastcastEventTeam | null {
    if (!data) {
      return null;
    }
    return {
      id: data.id,
      uid: data.uid,
      eventUid,
      isHome: data.homeAway,
      score: data.score,
      abbrev: data.abbreviation,
      logo: data.logo,
      isWinner: data.winner,
      name: data.name ?? data.abbreviation,
      color: data.color,
      altColor: data.alternateColor,
      record: Array.isArray(data.record) ? null : data.record,
      rank: data.rank ?? null,
      winPct: null,
    };
  }

  static transformEventImportToFastcastEvent(event: EventsImport): FastcastEvent {
    if (!event) {
      return null;
    }

    let mlbSituation = {} as MlbSituation | null;
    if (
      event?.situation?.batter == null ||
      event?.situation?.pitcher == null ||
      event?.situation?.balls == null ||
      event?.situation?.strikes == null ||
      event?.situation?.outs == null ||
      event?.situation?.onFirst == null ||
      event?.situation?.onSecond == null ||
      event?.situation?.onThird == null
    ) {
      mlbSituation = null;
    } else {
      Object.assign(mlbSituation, {
        batter: event?.situation?.batter,
        pitcher: event?.situation?.pitcher,
        balls: event?.situation?.balls,
        strikes: event?.situation?.strikes,
        outs: event?.situation?.outs,
        onFirst: event?.situation?.onFirst,
        onSecond: event?.situation?.onSecond,
        onThird: event?.situation?.onThird,
      });
    }

    let footballSituation = {} as FootballSituation | null;
    if (
      event?.situation?.shortDownDistanceText == null ||
      event?.situation?.possessionText == null ||
      event?.situation?.possession == null
    ) {
      footballSituation = null;
    } else {
      Object.assign(footballSituation, {
        shortDownDistanceText: event?.situation?.shortDownDistanceText,
        possessionText: event?.situation?.possessionText,
        isRedZone: null,
        possession: event?.situation?.possession,
      });
    }

    return {
      id: event?.id,
      uid: event?.uid,
      leagueId: transformUidToId(event?.uid),
      timestamp: new Date(event?.date).getTime(),
      state: event?.fullStatus.type.state,
      completed: event?.fullStatus.type.completed,
      status: event?.status,
      name: event?.name,
      shortname: event?.shortName,
      location: event?.location,
      clock: event?.clock ?? null,
      summary: event?.summary,
      period: event?.period,
      note: event?.note ?? null,
      isHalftime: event?.fullStatus.type?.id ? Number(event?.fullStatus.type.id) === GameStatusId.Halftime : false,
      lastPlay: event?.situation?.lastPlay ?? null,
      mlbSituation,
      footballSituation,
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
    return this.api.get<FastCastImport>(url).pipe(
      map(res => {
        const final = {} as FastcastTransform;
        const leaguesImport = res.sports.filter(s => includeSports(s.id)).map(i => i.leagues);

        const flattenLeaguesImport = flatten(leaguesImport);
        const leagues: League[] = flattenLeaguesImport.map(l => EspnService.transformLeagueImportToLeague(l)).filter(l => l != null);

        const flattenEventsImport = flatten(flattenLeaguesImport.map(l => l.events));
        const events: FastcastEvent[] = flattenEventsImport
          .map(e => EspnService.transformEventImportToFastcastEvent(e))
          .filter(l => l != null);

        const teamsImport = flattenEventsImport.map(e => e?.competitors.map(c => EspnService.transformCompetitorToFastcastTeam(e.uid, c)));
        const teams: FastcastEventTeam[] = flatten(teamsImport);

        Object.assign(final, {
          leagues,
          events,
          teams,
        });

        return final;
      })
    );
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

export type FastcastTransform = {
  leagues: League[];
  events: FastcastEvent[];
  teams: FastcastEventTeam[];
};
