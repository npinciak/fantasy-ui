import { PositionEntityMap } from '@app/@shared/base-models/base-position.model';
import { flatten } from '@app/@shared/helpers/utils';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { FastcastEvent, FootballSituation, MlbSituation } from '@app/espn-fastcast/models/fastcast-event.model';
import { FastcastLeague } from '@app/espn-fastcast/models/fastcast-league.model';
import { FastcastSport } from '@app/espn-fastcast/models/fastcast-sport.model';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient, EspnFastcastClient, EVENT_STATUS_ID } from 'sports-ui-sdk/lib/espn/espn.m';
import { excludeLeagues, flattenPlayerStats, includeSports, teamColorHandler, transformIdToUid, transformUidToId } from '../espn-helpers';
import { headshotImgBuilder, NO_LOGO } from '../espn.const';
import { FantasyLeague } from '../models/fantasy-league.model';
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

export function clientPlayerNewsFeed(playerId: string, playerNewsFeed: EspnClient.PlayerNewsFeed): PlayerNews[] {
  const news = {
    id: playerId,
    news: playerNewsFeed.feed.map(article => {
      const { id, published, headline, story, byline, images, type } = article;

      const author = exists(byline) ? byline : null;

      const storyImages = exists(images) ? images : [];

      const heroImage = '';

      return { id: id.toString(), author, type, headline, heroImage, story, storyImages, published };
    }),
  } as PlayerNews;
  return [news];
}

export function clientLeagueToLeague(league: EspnClient.League): FantasyLeague {
  const { id, seasonId, scoringPeriodId, status, settings, transactions } = league;
  const { matchupPeriodCount } = settings.scheduleSettings;
  const { firstScoringPeriod, finalScoringPeriod } = status;

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

export function clientPlayerToPlayer(
  playerInfo: EspnClient.PlayerInfo,
  opts: { sport: EspnClient.SportId; leagueId: EspnClient.LeagueId; teamMap: Record<string, string>; positionMap: PositionEntityMap }
): {
  id: string;
  name: string;
  img: string;
  teamId: string;
  teamUid: string;
  position: string;
  injured: boolean;
  team: string;
  injuryStatus: EspnClient.PlayerInjuryStatus;
  defaultPositionId: number;
  percentOwned: number;
  percentChange: number;
  percentStarted: number;
  stats: EspnClient.PlayerStatsByYearMap | null;
  outlookByWeek: {
    week: number;
    outlook: string;
  }[];
} {
  const { sport, leagueId, teamMap, positionMap } = opts;
  const { proTeamId, defaultPositionId, injuryStatus, injured, outlooks, id, fullName, stats, ownership } = playerInfo;

  const league = LEAGUE_ABBREV_BY_ID[leagueId];
  const team = teamMap[proTeamId] as string;
  const flatStats = flattenPlayerStats(stats);
  const outlookByWeek = clientPlayerOutlook(outlooks);

  return {
    id: id.toString(),
    name: fullName,
    teamId: proTeamId.toString(),
    teamUid: transformIdToUid(sport, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: headshotImgBuilder(id, { league }),
    injured,
    stats: flatStats,
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

export function clientCompetitorToFastcastTeam(eventUid: string, data: EspnFastcastClient.CompetitorsEntity): FastcastEventTeam | null {
  if (!data) return null;

  const { id, uid, score } = data;

  return {
    id,
    uid,
    eventUid,
    score,
    abbrev: data.abbreviation,
    isHome: data.homeAway,
    logo: data.logo.length > 0 ? data.logo : NO_LOGO,
    isWinner: data.winner,
    name: data.name ?? data.abbreviation,
    color: teamColorHandler(data),
    altColor: `#${data.alternateColor}` ?? null,
    record: typeof data.record === 'string' ? data.record : data.record[0].displayValue,
    rank: data.rank ?? null,
    winPct: null,
  };
}

export function clientEventToFastcastEvent(event: EspnFastcastClient.EventsEntity): FastcastEvent | null {
  if (!event) return null;

  const mlbSituation = {} as MlbSituation;
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

  const footballSituation = {} as FootballSituation;
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
        obj[val.homeAway] = clientCompetitorToFastcastTeam(event.uid, val);
        return obj;
      }, {})
    : null;

  const { id, uid, name, status, seasonType, shortName, location, summary, period, link } = event;

  const { state, completed } = event.fullStatus.type;

  return {
    id,
    uid,
    leagueId: transformUidToId(event.uid) ?? '',
    timestamp: new Date(event?.date).getTime(),
    state,
    completed,
    status,
    statusId: event.fullStatus.type.id,
    name,
    seasonType,
    shortName,
    location,
    clock: event?.clock ?? null,
    seriesSummary: event?.seriesSummary ?? null,
    summary,
    period,
    note: event?.note ?? null,
    isHalftime: event?.fullStatus.type?.id ? event?.fullStatus.type.id === EVENT_STATUS_ID.Halftime : false,
    lastPlay: event?.situation?.lastPlay ?? null,
    link,
    odds: event.odds ? event.odds : null,
    mlbSituation,
    footballSituation,
    teams,
  };
}
