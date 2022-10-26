import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { FastcastLeague } from '@app/espn-fastcast/models/fastcast-league.model';
import { FastcastSport } from '@app/espn-fastcast/models/fastcast-sport.model';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClientEventList, EspnClientFreeAgent, EspnClientPlayerNews, EspnGameStatusTypeId } from '@espnClient/espn-client.model';
import {
  CompetitorsEntity as CompetitorsImport,
  EspnClientFastcast as FastCastImport,
  EventsEntity as EventsImport,
  LeaguesEntity as LeaguesImport,
  SportsEntity,
} from '@espnClient/espn-fastcast.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import { exists, flatten } from '../../@shared/helpers/utils';
import { FastcastEvent, FootballSituation, MlbSituation } from '../../espn-fastcast/models/fastcast-event.model';
import { FastcastEventTeam } from '../../espn-fastcast/models/fastcast-team.model';
import { includeSports, transformUidToId } from '../espn-helpers';
import { NO_LOGO } from '../espn.const';
import {
  EspnEndpointBuilder,
  EspnParamFragment,
  EspnViewParamFragment,
  espnViewParamFragmentList,
  FantasySports,
} from '../models/espn-endpoint-builder.model';

@Injectable({
  providedIn: 'root',
})
export class EspnService {
  constructor(private api: ApiService) {}

  static transformSportsEntityToSport(sportsEntity: SportsEntity): FastcastSport {
    const { id, uid, name, slug } = sportsEntity;

    return {
      id,
      uid,
      name,
      slug,
    };
  }

  static transformLeagueImportToFastcastLeague(leagueImport: LeaguesImport): FastcastLeague {
    const { id, uid, name, isTournament, slug } = leagueImport;
    return {
      id,
      uid,
      name,
      abbrev: leagueImport.abbreviation ?? leagueImport.name,
      shortName: leagueImport.shortName ?? leagueImport.name,
      isTournament,
      slug,
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
      abbrev: data.abbreviation,
      isHome: data.homeAway,
      score: data.score,
      logo: data.logo.length > 0 ? data.logo : NO_LOGO,
      isWinner: data.winner,
      name: data.name ?? data.abbreviation,
      color: data.color === 'ffffff' || data.color === 'ffff00' ? `#${data.alternateColor}` : `#${data.color}`,
      altColor: `#${data.alternateColor}` ?? null,
      record: typeof data.record === 'string' ? data.record : data.record[0].displayValue,
      rank: data.rank ?? null,
      winPct: null,
    };
  }

  static transformEventImportToFastcastEvent(event: EventsImport): FastcastEvent | null {
    if (!event) {
      return null;
    }

    let mlbSituation = {} as MlbSituation;
    // if (
    //   event?.situation?.batter == null ||
    //   event?.situation?.pitcher == null ||
    //   event?.situation?.balls == null ||
    //   event?.situation?.strikes == null ||
    //   event?.situation?.outs == null ||
    //   event?.situation?.onFirst == null ||
    //   event?.situation?.onSecond == null ||
    //   event?.situation?.onThird == null
    // ) {
    //   mlbSituation = null;
    // } else {
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
    // }

    let footballSituation = {} as FootballSituation;
    // if (
    //   event?.situation?.shortDownDistanceText == null ||
    //   event?.situation?.possessionText == null ||
    //   event?.situation?.possession == null
    // ) {
    //   footballSituation = null;
    // } else {
    Object.assign(footballSituation, {
      shortDownDistanceText: event?.situation?.shortDownDistanceText,
      possessionText: event?.situation?.possessionText,
      isRedZone: null,
      possession: event?.situation?.possession,
    });
    // }

    const teams = exists(event.competitors)
      ? event.competitors.reduce((obj, val) => {
          obj[val.homeAway] = EspnService.transformCompetitorToFastcastTeam(event.uid, val);
          return obj;
        }, {})
      : null;

    return {
      id: event?.id,
      uid: event?.uid,
      leagueId: transformUidToId(event.uid) ?? '',
      timestamp: new Date(event?.date).getTime(),
      state: event?.fullStatus.type.state,
      completed: event?.fullStatus.type.completed,
      status: event?.status,
      statusId: event.fullStatus.type.id,
      name: event.name,
      seasonType: event.seasonType,
      shortName: event.shortName,
      location: event.location,
      clock: event?.clock ?? null,
      seriesSummary: event?.seriesSummary ?? null,
      summary: event?.summary,
      period: event?.period,
      note: event?.note ?? null,
      isHalftime: event?.fullStatus.type?.id ? event?.fullStatus.type.id === EspnGameStatusTypeId.Halftime : false,
      lastPlay: event?.situation?.lastPlay ?? null,
      link: event.link,
      odds: event.odds ? event.odds : null,
      mlbSituation,
      footballSituation,
      teams,
    };
  }

  /**
   * Update Espn Fantasy Team
   *
   * @param payload
   * @param leagueId
   * @returns
   */
  espnUpdateFantasyTeam(payload: unknown, sport: FantasySports, leagueId: string): Observable<unknown> {
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
  espnFantasyLeagueBySport<T>(data: { sport: FantasySports; leagueId: string; year: string; headers?: HttpHeaders }): Observable<T> {
    const endpoint = new EspnEndpointBuilder(data.sport, data.leagueId, data.year);
    return this.api.get<T>(endpoint.fantasyLeague, { params: this.params, headers: data.headers });
  }

  /**
   * Retrieve Espn Fantasy League
   *
   * @param leagueId
   * @param sport
   * @returns EspnClientLeague
   */
  espnFantasyLeagueEvents(sport: FantasySports, headers?: HttpHeaders): Observable<EspnClientEventList> {
    const endpoint = new EspnEndpointBuilder(sport);
    const params = new HttpParams()
      .set(EspnParamFragment.UseMap, true)
      .set(EspnParamFragment.Dates, currentDate(''))
      .set(EspnParamFragment.PbpOnly, true);
    return this.api.get<EspnClientEventList>(endpoint.espnEvents, { params, headers });
  }

  /**
   * Fetch player news
   *
   * @param lookbackDays Days back for news
   * @param playerId Player Id
   * @param sport
   * @returns Player news
   */
  espnFantasyPlayerNewsBySport(data: { sport: FantasySports; lookbackDays: string; playerId: string }): Observable<EspnClientPlayerNews> {
    const endpoint = new EspnEndpointBuilder(data.sport);
    const params = new HttpParams().set(EspnParamFragment.Days, data.lookbackDays).set(EspnParamFragment.PlayerId, data.playerId);
    return this.api.get<EspnClientPlayerNews>(endpoint.fantasyPlayerNews, { params });
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
    leagueId: string,
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
        const sports = res.sports.map(s => EspnService.transformSportsEntityToSport(s));

        const leaguesImport = res.sports.filter(s => includeSports(s.id)).map(i => i.leagues);
        const flattenLeaguesImport = flatten(leaguesImport);

        const leagues = exists(flattenLeaguesImport)
          ? flattenLeaguesImport.map(l => EspnService.transformLeagueImportToFastcastLeague(l))
          : [];
        const flatLeaguesEvents = exists(flattenLeaguesImport) ? flattenLeaguesImport.map(l => (exists(l.events) ? l.events : [])) : [];

        const flattenEventsImport = flatten(flatLeaguesEvents);

        const events = exists(flattenEventsImport)
          ? flattenEventsImport.map(e => EspnService.transformEventImportToFastcastEvent(e)).filter(l => l != null)
          : [];

        const teams = [];

        Object.assign(final, {
          sports,
          leagues,
          events,
          teams,
        });

        return final;
      })
    );
  }

  /**
   * Send espn server cookie in headers for POST
   */
  private get postHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Cookie', 'ESPN-ONESITE.WEB-PROD.token');
    return headers;
  }

  /**
   * Append all query params to http request
   */
  private get params(): HttpParams {
    let params = new HttpParams();
    espnViewParamFragmentList.map(fragment => {
      // if (fragment !== EspnViewParamFragment.Comms && fragment !== EspnViewParamFragment.PendingTransactions) {
      params = params.append(EspnParamFragment.View, fragment);
      // }
    });
    return params;
  }
}
