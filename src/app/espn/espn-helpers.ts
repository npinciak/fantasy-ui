import { tickerDate } from '@app/@shared/helpers/date';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { EspnClient, EspnFastcastClient, EVENT_STATUS, PITCHING_LINEUP_IDS, PLAYER_INJURY_STATUS, SEASON_ID } from 'sports-ui-sdk';
import { BaseballPlayer, BaseballPlayerStatsRow } from './mlb/models/baseball-player.model';
import { FootballPlayer } from './nfl/models/football-player.model';

/**
 * Sports to include in Fastcast
 *
 * @param id
 * @returns
 */
export function includeSports(id: string): boolean {
  return new Set(['1', '20', '40', '70', '600']).has(id);
}

/**
 * Leagues to include in Fastcast
 *
 * @param id
 * @returns boolean
 */
export function includeLeagues(id: string): boolean {
  return new Set(['10', '28', '46', '90', '775', '776', '20296']).has(id);
}

/**
 * Leagues to exclude in Fastcast
 *
 * @param id
 * @returns boolean
 */
export function excludeLeagues(id: string): boolean {
  return new Set(['14', '102', '3923', '8097', '20226', '54', '19834', '19483', '19868', '19728']).has(id);
}

/**
 * Find if player is eligible pitcher
 *
 * @param eligiblePos
 * @returns boolean
 */
export function isPitcher(eligiblePos: number[]): boolean {
  return eligiblePos.some(posId => PITCHING_LINEUP_IDS.has(posId));
}

/**
 * Removes and replaces poor contrast team colors
 *
 * @param val
 * @returns string | null
 *
 * @example teamColor()
 */
export function teamColorHandler(val: EspnFastcastClient.CompetitorsEntity): string | null {
  const { color, alternateColor } = val;

  if (!color || !alternateColor) return null;

  const negativeColors = new Set([
    '80fed2',
    'ffffff',
    'ffc600',
    'ffff00',
    'fcee33',
    'fafafc',
    'cccccc',
    'ffdc02',
    'fdba31',
    'f7aa25',
    'ffc72c',
    'd1d3d4',
    'eaaa00',
    'f7f316',
    'aed6f1',
    'e8d035',
    'c9c7c8',
    'f3f31e',
    'f5b6cd',
    'b7d0e9',
  ]);

  if (negativeColors.has(color.toLowerCase()) && negativeColors.has(alternateColor.toLowerCase())) return '#445058';

  return negativeColors.has(color.toLowerCase()) ? `#${alternateColor}` : `#${color}`;
}

/**
 * Simple string concat to format football situation
 *
 * @param downDistanceText
 * @param possessionText
 *
 * @example transformDownDistancePositionText('1st and 10', 'NE 25') // 1st and 10, NE 25
 *
 */
export function transformDownDistancePositionText(downDistanceText: string | null, possessionText: string | null): string | null {
  if (!downDistanceText || !possessionText) return null;

  return `${downDistanceText}, ${possessionText}`;
}

/**
 * Transforms uid string to league id
 *
 * @param uid
 * @returns
 *
 * @example transformUidToLeagueId('s:6~l:1~s:4~t:5') // '1'
 */
export function transformUidToLeagueId(uid: string | null): string | null {
  if (!uid) return null;
  return uid.split('~')[1].replace('l:', '');
}

export function transformIdToUid(
  sportId: EspnClient.SportId | null,
  leagueId: EspnClient.LeagueId | null,
  teamId: string | number | null
): string {
  if (!sportId || !leagueId || !teamId) return '';
  return `s:${sportId}~l:${leagueId}~t:${teamId}`;
}

/**
 *
 *
 * @param str
 * @returns
 */
export function parseEventUidStringToId(str: string): ParsedUid | null {
  const tokens = str.split('~');

  if (tokens.length !== 4) return null;

  const [s, l, e, c] = tokens.map(token => {
    const [key, value] = token.split(':');
    if (key && value) return value;
    return null;
  });

  if (s && l && e && c) return { sportId: s, leagueId: l, eventId: e, competitionId: c };

  return null;
}

export function parseTeamUidStringToId(str: string): ParsedUid | null {
  const tokens = str.split('~');

  if (tokens.length !== 3) return null;

  const [s, l, t] = tokens.map(token => {
    const [key, value] = token.split(':');
    if (key && value) return value;
    return null;
  });

  if (s && l && t) return { sportId: s, leagueId: l, teamId: t };

  return null;
}

export type ParsedUid = {
  sportId: string;
  leagueId: string;
  eventId?: string;
  competitionId?: string;
  teamId?: string;
};

/**
 * Flatten player stats
 *
 * @param stats
 * @returns
 */
export function flattenPlayerStats(stats?: EspnClient.PlayerStatsYear[] | null): Record<string, EspnClient.PlayerStatsYear | null> | null {
  if (!stats) return null;

  return stats.reduce<Record<string, EspnClient.PlayerStatsYear | null>>((result, stat) => {
    result[stat.id] = stat;
    return result;
  }, {});
}

/**
 * Filters bench players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function benchPlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  const playerList = players.filter(p => lineupMap[p.lineupSlotId].bench);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}

/**
 * Filters starting players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function startingPlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  const playerList = players.filter(p => !lineupMap[p.lineupSlotId].bench);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}

/**
 * Sort players by lineupSlotId
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function sortPlayersByLineupSlotDisplayOrder<T extends FootballPlayer | BaseballPlayer | BaseballPlayerStatsRow>(
  players: T[],
  lineupMap: EspnClient.LineupEntityMap
): T[] {
  return players.sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder);
}

/**
 * Filters players on IR
 *
 * @param players
 * @returns
 */
export function injuredPlayersFilter<T extends FootballPlayer | BaseballPlayer>(players: T[]): T[] {
  return players.filter(p => p.injuryStatus === PLAYER_INJURY_STATUS.IR);
}

/**
 * Returns fastcast event summary
 *
 * @param event
 * @returns
 */
export function fastcastEventSummary(event: FastcastEvent): string | null {
  const { status, seasonType, note, timestamp, completed, summary } = event;

  const inProgress = status === EVENT_STATUS.InProgress;
  const eventPostponed = status === EVENT_STATUS.Postgame;
  const isPostseason = seasonType === SEASON_ID.Postseason;

  const date = tickerDate(timestamp);

  if (inProgress || eventPostponed) return summary;
  if (!completed && isPostseason) return exists(note) ? `${note} | ${date}` : date;
  if (completed && isPostseason) return exists(note) ? note : summary;
  if (completed && !isPostseason) return summary;

  return date;
}
