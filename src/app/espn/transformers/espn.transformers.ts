import { PositionEntityMap } from '@app/@shared/base-models/base-position.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { EspnClient, PLAYER_INJURY_STATUS } from '@sports-ui/ui-sdk/espn';
import {
  ARTICLE_TYPE,
  PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE,
  PlayerInfo,
  PlayerOutlooksMap,
  ProLeagueType,
  SportType,
} from '@sports-ui/ui-sdk/espn-client';
import { ImageBuilder } from '../const/image-builder';
import { flattenPlayerStats, transformIdToUid } from '../espn-helpers';
import { FantasyLeague } from '../models/fantasy-league.model';
import { FantasyPlayer } from '../models/fantasy-player.model';
import { PlayerNews } from '../models/player-news.model';

export function clientPlayerOutlook(outlooks?: PlayerOutlooksMap) {
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
  clientPlayer: PlayerInfo;
  sport: SportType;
  leagueId: ProLeagueType;
  teamMap: Record<string, string>;
  positionMap: PositionEntityMap;
}): FantasyPlayer {
  const { proTeamId, defaultPositionId, injured, outlooks, id, fullName, ownership, lastNewsDate } = clientPlayer;

  const team = teamMap[proTeamId] as string;
  const stats = flattenPlayerStats(clientPlayer.stats);
  const outlookByWeek = clientPlayerOutlook(outlooks);
  const injuryStatus = exists(clientPlayer.injuryStatus) ? clientPlayer.injuryStatus : PLAYER_INJURY_STATUS.Active;
  const league = PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[leagueId].toLowerCase();

  return {
    id: id.toString(),
    name: fullName,
    teamId: proTeamId.toString(),
    teamUid: transformIdToUid(sport, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: ImageBuilder({ sport, league }).headshotImgBuilder({ id }),
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
