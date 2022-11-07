import { PositionEntityMap } from '@app/@shared/base-models/base-position.model';
import { exists } from '@app/@shared/helpers/utils';
import { EspnClient, EspnLeagueId, EspnPlayerInjuryStatus, EspnSport } from '@espnClient/espn-client.model';
import { CompetitorsEntity } from '@espnClient/espn-fastcast.model';
import { headshotImgBuilder } from './espn.const';
import { BaseballPlayer } from './mlb/models/baseball-player.model';
import { FantasyLeague } from './models/fantasy-league.model';
import { LeagueNameByEspnLeagueId } from './models/league.model';
import { FootballPlayer } from './nfl/models/football-player.model';
import { FantasyFootballService } from './nfl/services/fantasy-football.service';

/**
 * Sports to include in Fastcast
 * @param id
 * @returns boolean
 */
export function includeSports(id: string): boolean {
  return new Set(['1', '20', '40', '70', '600']).has(id);
}

/**
 * Leagues to include in Fastcast
 * @param id
 * @returns boolean
 */
export function includeLeagues(id: string): boolean {
  return new Set(['10', '28', '46', '90', '775', '776', '20296', '19483']).has(id);
}

export function teamColorHandler(val: CompetitorsEntity): string | null {
  const color = val.color;
  const altColor = val.alternateColor;

  if (!exists(color) || !exists(altColor)) {
    return null;
  }

  const negativeColors = new Set(['ffffff', 'ffff00', 'fcee33', 'fafafc', 'cccccc']);

  if (negativeColors.has(color.toLocaleLowerCase()) && negativeColors.has(altColor.toLocaleLowerCase())) {
    return '#445058';
  }

  if (negativeColors.has(color.toLocaleLowerCase())) {
    return `#${altColor}`;
  }

  return `#${color}`;
}

/**
 * Simple string concat to format football situation
 * @param downDistanceText
 * @param possessionText
 *
 * @returns Ex: 1st and 10, NE 25
 */
export function transformDownDistancePositionText(downDistanceText: null, possessionText: null): null;
export function transformDownDistancePositionText(downDistanceText: string, possessionText: string): string;
export function transformDownDistancePositionText(downDistanceText: string | null, possessionText: string | null): string | null {
  if (downDistanceText && possessionText) {
    return `${downDistanceText}, ${possessionText}`;
  }
  return null;
}

export function transformUidToId(uid: null): null;
export function transformUidToId(uid: string): string;
export function transformUidToId(uid: string | null): string | null {
  if (!uid) return null;
  return uid.split('~')[1].replace('l:', '');
}

export function transformIdToUid(sportId: EspnSport | null, leagueId: EspnLeagueId | null, teamId: string | number | null): string {
  if (!sportId || !leagueId || !teamId) return '';
  return `s:${sportId}~l:${leagueId}~t:${teamId}`;
}

export function flattenPlayerStats(stats: EspnClient.PlayerStatsYear[]): EspnClient.PlayerStatsByYearMap;
export function flattenPlayerStats(stats: EspnClient.PlayerStatsYear[] | null): EspnClient.PlayerStatsByYearMap | null;
export function flattenPlayerStats(stats: EspnClient.PlayerStatsYear[] | undefined): EspnClient.PlayerStatsByYearMap | null;
export function flattenPlayerStats(stats: EspnClient.PlayerStatsYear[] | null | undefined): EspnClient.PlayerStatsByYearMap | null {
  if (!exists(stats)) {
    return null;
  }
  return stats.reduce((obj, val) => {
    obj[val.id] = val;
    return obj;
  }, {} as EspnClient.PlayerStatsByYearMap);
}

/**
 * Filters players in starting lineup
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function startingBaseballPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClient.LineupEntityMap): BaseballPlayer[] {
  return players
    .filter(p => lineupMap[p.lineupSlotId].starter)
    .sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder);
}

/**
 * Filters bench players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function benchPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClient.LineupEntityMap): BaseballPlayer[] {
  return players.filter(p => lineupMap[p.lineupSlotId].bench);
}

export function startingPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClient.LineupEntityMap): BaseballPlayer[];
export function startingPlayersFilter(players: FootballPlayer[], lineupMap: EspnClient.LineupEntityMap): FootballPlayer[];
export function startingPlayersFilter(
  players: BaseballPlayer[] | FootballPlayer[],
  lineupMap: EspnClient.LineupEntityMap
): BaseballPlayer[] | FootballPlayer[] {
  return (
    players
      // .filter(p => lineupMap[p.lineupSlotId].starter instanceof BaseballPlayer | FootballPlayer)
      .sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder)
  );
}

// .filter(p => NFL_LINEUP_MAP[p.lineupSlotId].starter)
// .sort((a, b) => NFL_LINEUP_MAP[a.lineupSlotId].displayOrder - NFL_LINEUP_MAP[b.lineupSlotId].displayOrder);

export function transformEspnClientLeagueToLeague(league: EspnClient.League): FantasyLeague {
  const { id, seasonId, scoringPeriodId, status, settings, transactions } = league;
  const { matchupPeriodCount } = settings.scheduleSettings;
  const { firstScoringPeriod, finalScoringPeriod } = status;

  return {
    id: id.toString(),
    seasonId: seasonId.toString(),
    scoringPeriodId,
    firstScoringPeriod,
    finalScoringPeriod,
    matchupPeriodCount,
    transactions,
  };
}

export function transformEspnClientPlayerToPlayer(
  playerInfo: EspnClient.PlayerInfo,
  opts: { sport: EspnSport; leagueId: EspnLeagueId; teamMap: Record<string, string>; positionMap: PositionEntityMap }
): {
  id: string;
  name: string;
  img: string;
  teamId: string;
  teamUid: string;
  position: string;
  injured: boolean;
  team: string;
  injuryStatus: EspnPlayerInjuryStatus;
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
  const { percentOwned, percentChange, percentStarted } = playerInfo?.ownership;

  const league = LeagueNameByEspnLeagueId[leagueId];

  const team = teamMap[proTeamId] as string;
  const stats = flattenPlayerStats(playerInfo.stats);

  const outlookByWeek = FantasyFootballService.transformOutlook(outlooks);

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
