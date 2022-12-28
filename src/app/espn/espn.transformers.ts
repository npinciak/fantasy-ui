import { PositionEntityMap } from '@app/@shared/base-models/base-position.model';
import { exists, existsFilter, flatten } from '@app/@shared/helpers/utils';
import { FastcastEvent, FootballSituation, MlbSituation } from '@app/espn-fastcast/models/fastcast-event.model';
import { FastcastLeague } from '@app/espn-fastcast/models/fastcast-league.model';
import { FastcastSport } from '@app/espn-fastcast/models/fastcast-sport.model';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { FastcastTransform } from '@app/espn-fastcast/models/fastcast-transform.model';
import { EspnClient, EspnFastcastClient } from 'sports-ui-sdk';

import { excludeLeagues, flattenPlayerStats, includeSports, teamColorHandler, transformIdToUid, transformUidToId } from './espn-helpers';
import { headshotImgBuilder, NO_LOGO } from './espn.const';
import { FantasyLeague } from './models/fantasy-league.model';
import { LeagueNameByEspnClient } from './models/league.model';

export namespace EspnTransformers {
  export function clientPlayerOutlook(outlooks?: EspnClient.PlayerOutlooksMap) {
    if (!exists(outlooks)) {
      return [];
    }

    const weeklyOutlook = outlooks.outlooksByWeek;

    if (!exists(weeklyOutlook)) {
      return [];
    }

    return Object.keys(weeklyOutlook)
      .map(k => {
        return {
          week: Number(k),
          outlook: weeklyOutlook[k],
        };
      })
      .sort((a, b) => b.week - a.week);
  }

  export function clientLeagueToLeague(league: EspnClient.League): FantasyLeague {
    const { id, seasonId, scoringPeriodId, status, settings, transactions } = league;
    const { matchupPeriodCount, playoffMatchupPeriodLength } = settings.scheduleSettings;
    const { firstScoringPeriod, finalScoringPeriod } = status;

    return {
      id: id.toString(),
      seasonId: seasonId.toString(),
      scoringPeriodId,
      firstScoringPeriod,
      finalScoringPeriod,
      matchupPeriodCount,
      playoffMatchupPeriodLength,
      transactions,
    };
  }

  export function clientPlayerToPlayer(
    playerInfo: EspnClient.PlayerInfo,
    opts: { sport: EspnClient.Sport; leagueId: EspnClient.LeagueId; teamMap: Record<string, string>; positionMap: PositionEntityMap }
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
    const { proTeamId, defaultPositionId, injuryStatus, injured, outlooks, id } = playerInfo;

    const percentOwned = playerInfo?.ownership ? playerInfo?.ownership.percentOwned : 0;
    const percentChange = playerInfo?.ownership ? playerInfo?.ownership.percentChange : 0;
    const percentStarted = playerInfo?.ownership ? playerInfo?.ownership.percentStarted : 0;

    const league = LeagueNameByEspnClient[leagueId];

    const team = teamMap[proTeamId] as string;
    const stats = flattenPlayerStats(playerInfo.stats);

    const outlookByWeek = clientPlayerOutlook(outlooks);

    return {
      id: id.toString(),
      name: playerInfo.fullName,
      teamId: proTeamId.toString(),
      teamUid: transformIdToUid(sport, leagueId, proTeamId),
      position: positionMap[defaultPositionId].abbrev,
      img: headshotImgBuilder(id, { league }),
      injured,
      stats,
      team,
      injuryStatus,
      defaultPositionId,
      outlookByWeek,
      percentOwned,
      percentChange,
      percentStarted,
    };
  }

  export function clientFastcastToFastcast(clientModel: EspnFastcastClient.EspnClientFastcast): FastcastTransform {
    const sports = clientModel.sports.map(s => EspnTransformers.clientSportsEntityToSport(s));

    const leaguesImport = clientModel.sports.filter(s => includeSports(s.id)).map(i => i.leagues);

    const flattenLeaguesImport = flatten(leaguesImport)?.filter(l => !excludeLeagues(l.id));

    const leagues = exists(flattenLeaguesImport)
      ? flattenLeaguesImport.map(l => EspnTransformers.clientLeagueImportToFastcastLeague(l))
      : [];

    const flatLeaguesEvents = exists(flattenLeaguesImport) ? flattenLeaguesImport.map(l => (exists(l.events) ? l.events : [])) : [];

    const flattenEventsImport = flatten(flatLeaguesEvents);

    const events = exists(flattenEventsImport)
      ? existsFilter(flattenEventsImport.map(e => EspnTransformers.clientEventToFastcastEvent(e)))
      : [];

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
    if (!data) {
      return null;
    }

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
          obj[val.homeAway] = EspnTransformers.clientCompetitorToFastcastTeam(event.uid, val);
          return obj;
        }, {})
      : null;

    const { id, uid, name, status, seasonType, shortName, location, summary, period, link } = event;

    return {
      id,
      uid,
      leagueId: transformUidToId(event.uid) ?? '',
      timestamp: new Date(event?.date).getTime(),
      state: event?.fullStatus.type.state,
      completed: event?.fullStatus.type.completed,
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
      isHalftime: event?.fullStatus.type?.id ? event?.fullStatus.type.id === EspnClient.GameStatusTypeId.Halftime : false,
      lastPlay: event?.situation?.lastPlay ?? null,
      link,
      odds: event.odds ? event.odds : null,
      mlbSituation,
      footballSituation,
      teams,
    };
  }
}
