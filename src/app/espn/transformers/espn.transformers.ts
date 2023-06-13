import { PositionEntityMap } from '@app/@shared/base-models/base-position.model';
import { flatten } from '@app/@shared/helpers/utils';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { FastcastEvent, FootballSituation, MlbSituation } from '@app/espn-fastcast/models/fastcast-event.model';
import { FastcastLeague } from '@app/espn-fastcast/models/fastcast-league.model';
import { FastcastSport } from '@app/espn-fastcast/models/fastcast-sport.model';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient, EspnFastcastClient } from '@sports-ui/ui-sdk/espn';
import { ARTICLE_TYPE, EVENT_STATUS_TYPE, SportType } from '@sports-ui/ui-sdk/espn-client';
import {
  excludeLeagues,
  flattenPlayerStats,
  includeSports,
  parseEventUidStringToId,
  parseTeamUidStringToId,
  teamColorHandler,
  transformIdToUid,
} from '../espn-helpers';
import { NO_LOGO, headshotImgBuilder } from '../espn.const';
import { FantasyLeague } from '../models/fantasy-league.model';
import { FantasyPlayer } from '../models/fantasy-player.model';
import { LEAGUE_ABBREV_BY_ID } from '../models/league.model';
import { PlayerNews } from '../models/player-news.model';

export function clientPlayerOutlook(outlooks?: EspnClient.PlayerOutlooksMap) {
  if (!exists(outlooks)) return [];

  const weeklyOutlook = outlooks.outlooksByWeek;

  if (!exists(weeklyOutlook)) return [];

  return Object.keys(weeklyOutlook)
    .map(k => ({
      week: Number(k),
      outlook: weeklyOutlook[k],
    }))
    .sort((a, b) => b.week - a.week);
}

export function clientPlayerNewsFeed(playerId: string, playerNewsFeed: EspnClient.PlayerNewsFeed): PlayerNews {
  return {
    id: playerId,
    news: playerNewsFeed.feed.map(article => {
      const { id, published, headline, story, byline, images, type, links } = article;

      const author = exists(byline) ? byline : type === ARTICLE_TYPE.Rotowire ? ARTICLE_TYPE.Rotowire : null;

      const storyImages = exists(images) ? images : [];

      const heroImage = '';

      const link = exists(links) && exists(links.mobile) ? links?.mobile?.href : null;

      return { id: id.toString(), author, type, headline, heroImage, story, storyImages, published, link };
    }),
  };
}

export function clientLeagueToLeague(league: EspnClient.League): FantasyLeague {
  const {
    id,
    seasonId,
    scoringPeriodId,
    status: { firstScoringPeriod, finalScoringPeriod },
    settings: {
      scheduleSettings: { matchupPeriodCount },
    },
    transactions,
  } = league;

  return {
    id: id.toString(),
    seasonId: seasonId.toString(),
    scoringPeriodId: scoringPeriodId.toString(),
    firstScoringPeriod: firstScoringPeriod.toString(),
    finalScoringPeriod: finalScoringPeriod.toString(),
    matchupPeriodCount: matchupPeriodCount.toString(),
    transactions,
  };
}

export function clientPlayerToFantasyPlayer({
  clientPlayer,
  sport,
  leagueId,
  teamMap,
  positionMap,
}: {
  clientPlayer: EspnClient.PlayerInfo;
  sport: SportType;
  leagueId: EspnClient.LeagueId;
  teamMap: Record<string, string>;
  positionMap: PositionEntityMap;
}): FantasyPlayer {
  const { proTeamId, defaultPositionId, injuryStatus, injured, outlooks, id, fullName, ownership, lastNewsDate } = clientPlayer;

  const league = LEAGUE_ABBREV_BY_ID[leagueId].toLowerCase();
  const team = teamMap[proTeamId] as string;
  const stats = flattenPlayerStats(clientPlayer.stats);
  const outlookByWeek = clientPlayerOutlook(outlooks);

  return {
    id: id.toString(),
    name: fullName,
    teamId: proTeamId.toString(),
    teamUid: transformIdToUid(sport, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: headshotImgBuilder({ id, league }),
    lastNewsDate,
    injured,
    stats,
    team,
    injuryStatus,
    defaultPositionId,
    outlookByWeek,
    percentOwned: ownership ? ownership.percentOwned : 0,
    percentChange: ownership ? ownership.percentChange : 0,
    percentStarted: ownership ? ownership.percentStarted : 0,
  };
}

export function clientFastcastToFastcast(clientModel: EspnFastcastClient.EspnClientFastcast): FastcastTransform {
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

export function clientSportsEntityToSport(sportsEntity: EspnFastcastClient.SportsEntity): FastcastSport {
  const { id, uid, name, slug } = sportsEntity;

  return {
    id,
    uid,
    name,
    slug,
  };
}

export function clientLeagueImportToFastcastLeague(leagueImport: EspnFastcastClient.LeaguesEntity): FastcastLeague {
  const { id, uid, name, isTournament, slug, abbreviation, shortName } = leagueImport;
  return {
    id,
    uid,
    name,
    abbrev: abbreviation ?? name,
    shortName: shortName ?? name,
    isTournament,
    slug,
    sport: '',
  };
}

export function clientCompetitorToFastcastTeam(eventUid: string, data: EspnFastcastClient.CompetitorsEntity): FastcastEventTeam | null {
  if (!data) return null;

  const { id, uid, name, winner, score, logo, abbreviation, homeAway, alternateColor, record, rank, seriesRecord } = data;

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
    record: typeof record === 'string' ? record : record[0].displayValue,
    rank: rank ?? null,
    winPct: null,
    seriesRecord,
  };
}

export function clientEventToFastcastEvent(event: EspnFastcastClient.EventsEntity): FastcastEvent | null {
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
