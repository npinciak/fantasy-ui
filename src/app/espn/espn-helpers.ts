import { exists } from '@app/@shared/helpers/utils';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';
import { EspnFastcastClient } from 'sports-ui-sdk/lib/models/espn-fastcast.model';
import { PitcherIdSet } from './mlb/consts/lineup.const';
import { BaseballPlayer } from './mlb/models/baseball-player.model';
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

/**
 * Leagues to exclude in Fastcast
 * @param id
 * @returns boolean
 */
export function excludeLeagues(id: string): boolean {
  return new Set(['3923', '8097', '20226', '54', '19834']).has(id);
}

/**
 * Find if player is eligible pitcher
 *
 * @param eligiblePos
 * @returns
 */
export function isPitcher(eligiblePos: number[]): boolean {
  for (let i = 0; i < eligiblePos.length; i++) {
    if (PitcherIdSet.has(eligiblePos[i])) {
      return true;
    }
    return false;
  }
  return false;
}

export function teamColorHandler(val: EspnFastcastClient.CompetitorsEntity): string | null {
  const color = val.color;
  const altColor = val.alternateColor;

  if (!exists(color) || !exists(altColor)) {
    return null;
  }

  const negativeColors = new Set(['ffffff', 'ffff00', 'fcee33', 'fafafc', 'cccccc', 'ffdc02']);

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

export function transformIdToUid(
  sportId: EspnClient.Sport | null,
  leagueId: EspnClient.LeagueId | null,
  teamId: string | number | null
): string {
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
 * Filters bench players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function benchPlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  return players.filter(p => lineupMap[p.lineupSlotId].bench);
}

export function startingPlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  return players
    .filter(p => lineupMap[p.lineupSlotId].starter)
    .sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder);
}

export function injuredReservePlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[]): T[] {
  return players.filter(p => p.injuryStatus === EspnClient.PlayerInjuryStatus.IR);
}
