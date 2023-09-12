import { excludeLeagues, includeSports, parseEventUidStringToId, parseTeamUidStringToId, teamColorHandler } from '@app/espn/espn-helpers';
import { NO_LOGO } from '@app/espn/espn.const';
import { EVENT_STATUS_TYPE } from '@sports-ui/ui-sdk';
import { CompetitorsEntity, EventsEntity, FASTCAST_EVENT_TYPE, LeaguesEntity, SportsEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';
import { exists, existsFilter } from '@sports-ui/ui-sdk/helpers';

import { flatten } from '@app/@shared/helpers/utils';
import { FastcastEvent, FootballSituation, MlbSituation } from '../models/fastcast-event.model';
import { FastcastLeague } from '../models/fastcast-league.model';
import { FastcastSport } from '../models/fastcast-sport.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { FastcastTransform } from '../models/fastcast-transform.model';

export function clientFastcastToFastcast(clientModel: { sports: SportsEntity[] }): FastcastTransform {
  const sports = clientModel.sports.map(s => clientSportsEntityToSport(s));

  const leaguesImport = clientModel.sports.filter(s => includeSports(s.id)).map(i => i.leagues);

  const flattenLeaguesImport = flatten(leaguesImport)?.filter(l => !excludeLeagues(l.id));

  const leagues = exists(flattenLeaguesImport) ? flattenLeaguesImport.map(l => clientLeagueImportToFastcastLeague(l)) : [];

  const flatLeaguesEvents = exists(flattenLeaguesImport) ? flattenLeaguesImport.map(l => (exists(l.events) ? l.events : [])) : [];

  const flattenEventsImport = flatten(flatLeaguesEvents);

  const events = exists(flattenEventsImport) ? existsFilter(flattenEventsImport.map(e => clientEventToFastcastEvent(e))) : [];

  const teams = [];

  return {
    sports,
    leagues,
    events,
    teams,
  };
}

export function clientSportsEntityToSport(sportsEntity: SportsEntity): FastcastSport {
  const { id, uid, name, slug } = sportsEntity;
  return {
    id,
    uid,
    name,
    slug,
  };
}

export function clientLeagueImportToFastcastLeague(leagueImport: LeaguesEntity): FastcastLeague {
  const { id, uid, name, slug, isTournament, abbreviation, shortName } = leagueImport;
  return {
    id,
    uid,
    name,
    slug,
    isTournament,
    abbreviation: abbreviation ?? name,
    shortName: shortName ?? name,
    sport: '',
  };
}

export function clientCompetitorToFastcastTeam(eventUid: string, data: CompetitorsEntity): FastcastEventTeam | null {
  if (!data) return null;

  const { id, uid, name, winner, score, logo, abbreviation, homeAway, alternateColor, rank, seriesRecord } = data;

  const record = data.record == undefined ? null : typeof data.record === 'string' ? data.record : data.record[0].displayValue;

  return {
    id,
    uid,
    eventIds: parseTeamUidStringToId(uid),
    score,
    abbrev: abbreviation,
    isHome: homeAway,
    logo: logo.length > 0 ? logo : NO_LOGO,
    isWinner: winner,
    name: name ?? abbreviation,
    color: teamColorHandler(data),
    altColor: `#${alternateColor}` ?? null,
    record,
    rank: rank ?? null,
    winPct: null,
    seriesRecord,
  };
}

export function clientEventToFastcastEvent(event: EventsEntity): FastcastEvent | null {
  if (!event) return null;

  const mlbSituation = {} as MlbSituation;

  // mlbSituation.batter = event?.situation?.batter;
  // mlbSituation.pitcher = event?.situation?.pitcher;
  // mlbSituation.balls = event?.situation?.balls;
  // mlbSituation.strikes = event?.situation?.strikes;
  // mlbSituation.outs = event?.situation?.outs;
  // mlbSituation.onFirst = event?.situation?.onFirst;
  // mlbSituation.onSecond = event?.situation?.onSecond;
  // mlbSituation.onThird = event?.situation?.onThird;

  const footballSituation = {} as FootballSituation;

  footballSituation['shortDownDistanceText'] = event?.situation?.shortDownDistanceText ?? '';
  footballSituation['possessionText'] = event?.situation?.possessionText ?? '';
  footballSituation['isRedZone'] = false;
  footballSituation['possession'] = event?.situation?.possession ?? '';

  const teams = exists(event.competitors)
    ? event.competitors.reduce((obj, val) => {
        const { homeAway } = val;
        obj[homeAway] = clientCompetitorToFastcastTeam(event.uid, val);
        return obj;
      }, {})
    : null;

  const {
    id,
    uid,
    name,
    status,
    seasonType,
    shortName,
    location,
    summary,
    period,
    link,
    date,
    fullStatus: {
      type: { state, completed },
    },
    odds,
    note,
    clock,
    seriesSummary,
    situation,
  } = event;

  return {
    id,
    uid,
    eventIds: parseEventUidStringToId(uid),
    timestamp: new Date(date).getTime(),
    state,
    completed,
    status,
    statusId: event.fullStatus.type.id,
    name,
    seasonType,
    shortName,
    location,
    clock: clock ?? null,
    seriesSummary: seriesSummary ?? null,
    summary,
    period,
    isTournament: false,
    note: note ?? null,
    isHalftime: event?.fullStatus.type?.id ? event?.fullStatus.type.id === EVENT_STATUS_TYPE.Halftime : false,
    lastPlay: situation?.lastPlay ?? null,
    link,
    odds: odds ?? null,
    mlbSituation,
    footballSituation,
    teams,
  };
}

/**
 *
 * Transform fastcast event slug to live game
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 *    gameId: string
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: gp-baseball-mlb-401355468
 * ```
 *
 */
export function transformEventToLiveFastcastEventType({ sport, league, gameId }: { sport: string; league: string; gameId: string }) {
  return `${FASTCAST_EVENT_TYPE.LiveGame}-${sport}-${league}-${gameId}`;
}

/**
 *
 * Transform fastcast sport
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: event-baseball-mlb
 * ```
 *
 */
export function transformSportToFastcastEventType({ sport }: { sport: string }): string;
export function transformSportToFastcastEventType({ sport, league }: { sport: string; league: string }): string;
export function transformSportToFastcastEventType({ sport, league }: { sport: string; league?: string }): string {
  if (!exists(league)) {
    `${FASTCAST_EVENT_TYPE.Event}-${sport}`;
  }
  return `${FASTCAST_EVENT_TYPE.Event}-${sport}-${league}`;
}
