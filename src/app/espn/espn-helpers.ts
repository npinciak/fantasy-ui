import { exists } from '@app/@shared/helpers/utils';
import { EspnClientLineupEntityMap, EspnClientPlayerStatsByYearMap, EspnClientPlayerStatsYear } from '@espnClient/espn-client.model';
import { CompetitorsEntity } from '@espnClient/espn-fastcast.model';
import { BaseballPlayer } from './mlb/models/baseball-player.model';
import { StatTypePeriodId } from './models/espn-stats.model';
import { FootballPlayer } from './nfl/models/football-player.model';

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

export function transformIdToUid(sport: string | null, league: string | null, team: string | null): string | null {
  if (!sport || !league || !team) return null;
  return `s:${sport}~l:${league}~t:${team}`;
}

export function YearToStatTypePeriod(periodType: StatTypePeriodId, dateObj = new Date()): string {
  const year = dateObj.getFullYear();

  const isProj = periodType === StatTypePeriodId.Projected;

  return isProj ? `${periodType}${year}` : `0${periodType}${year}`;
}

export function StatTypePeriodToYear(statTypePeriod: string): string {
  return statTypePeriod.split('').splice(2, 6).join('');
}

export function flattenPlayerStats(stats: EspnClientPlayerStatsYear[]): EspnClientPlayerStatsByYearMap;
export function flattenPlayerStats(stats: EspnClientPlayerStatsYear[] | null): EspnClientPlayerStatsByYearMap | null;
export function flattenPlayerStats(stats: EspnClientPlayerStatsYear[] | undefined): EspnClientPlayerStatsByYearMap | null;
export function flattenPlayerStats(stats: EspnClientPlayerStatsYear[] | null | undefined): EspnClientPlayerStatsByYearMap | null {
  if (!exists(stats)) {
    return null;
  }
  return stats.reduce((obj, val) => {
    obj[val.id] = val;
    return obj;
  }, {} as EspnClientPlayerStatsByYearMap);
}

/**
 * Filters players in starting lineup
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function startingBaseballPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClientLineupEntityMap): BaseballPlayer[] {
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
export function benchPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClientLineupEntityMap): BaseballPlayer[] {
  return players.filter(p => lineupMap[p.lineupSlotId].bench);
}

export function startingPlayersFilter(players: BaseballPlayer[], lineupMap: EspnClientLineupEntityMap): BaseballPlayer[];
export function startingPlayersFilter(players: FootballPlayer[], lineupMap: EspnClientLineupEntityMap): FootballPlayer[];
export function startingPlayersFilter(
  players: BaseballPlayer[] | FootballPlayer[],
  lineupMap: EspnClientLineupEntityMap
): BaseballPlayer[] | FootballPlayer[] {
  return (
    players
      // .filter(p => lineupMap[p.lineupSlotId].starter instanceof BaseballPlayer | FootballPlayer)
      .sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder)
  );
}

// .filter(p => NFL_LINEUP_MAP[p.lineupSlotId].starter)
// .sort((a, b) => NFL_LINEUP_MAP[a.lineupSlotId].displayOrder - NFL_LINEUP_MAP[b.lineupSlotId].displayOrder);
