import { BaseballPlayer, BaseballPlayerStatsRow } from '@app/espn-fantasy-baseball/models/baseball-player.model';
import { FootballPlayer } from '@app/espn-fantasy-football/models/football-player.model';
import { EventSummaryBySeasonTypeByEventStatus } from '@app/espn-fastcast/models/fastcast-event-summary.model';
import { FastcastEvent } from '@app/espn-fastcast/models/fastcast-event.model';
import { EspnClient, PITCHING_LINEUP_IDS, PLAYER_INJURY_STATUS } from '@sports-ui/ui-sdk/espn';
import {
  EVENT_STATUS,
  EVENT_STATUS_TYPE,
  PlayerStatsYear,
  ProLeagueType,
  SEASON_TYPE,
  SEASON_TYPE_LIST,
  SportType,
} from '@sports-ui/ui-sdk/espn-client';
import { CompetitorsEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';
import { exists, getContrastRatio } from '@sports-ui/ui-sdk/helpers';
import { EspnDateHelper } from './espn-date-helper';

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
  const leagueIds = ['14', '62', '760', '102', '3923', '8097', '8301', '20226', '54', '59', '19834', '8301', '19483', '19868', '19728'];
  return new Set(leagueIds).has(id);
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
 * @example teamColorHandler()
 */
export function teamColorHandler(val: CompetitorsEntity): string | null {
  const { color, alternateColor } = val;

  if (!color || !alternateColor) return null;

  const validColorRatio = getContrastRatio(color, 'ffffff') <= 2.5;
  const validAlternativeColorRatio = getContrastRatio(alternateColor, 'ffffff') <= 2.5;

  if (validColorRatio && validAlternativeColorRatio) return '#445058';

  return validColorRatio ? `#${alternateColor ?? '445058'}` : `#${color}`;
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

export function transformIdToUid(sportType: SportType | null, leagueId: ProLeagueType | null, teamId: string | number | null): string {
  if (!sportType || !leagueId || !teamId) return '';
  return `s:${sportType}~l:${leagueId}~t:${teamId}`;
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

  if (s && l && e && c) return { sportType: s, leagueId: l, eventId: e, competitionId: c };

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

  if (s && l && t) return { sportType: s, leagueId: l, teamId: t };

  return null;
}

export type ParsedUid = {
  sportType: string;
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
export function flattenPlayerStats(stats?: PlayerStatsYear[] | null): Record<string, PlayerStatsYear | null> | null {
  if (!stats) return null;

  return stats.reduce<Record<string, PlayerStatsYear | null>>((result, stat) => {
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
  const playerList = players.filter(p => !lineupMap[p.lineupSlotId].bench && p.lineupSlotId !== 21);
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
  const { status, statusId, seasonType, note, timestamp, summary } = event;

  const tickerDate = new EspnDateHelper().tickerDate;

  const defaultPregame = tickerDate(timestamp);
  const defaultInProgress = statusId === EVENT_STATUS_TYPE.RainDelay ? `Rain Delay, ${summary}` : summary;

  const postSeasonPregame = exists(note) ? `${note} | ${tickerDate(timestamp)}` : tickerDate(timestamp);
  const postSeasonPostgame = exists(note) ? `${note}, ${summary}` : summary;

  const eventSummary: EventSummaryBySeasonTypeByEventStatus = {
    [SEASON_TYPE.Preseason]: {
      [EVENT_STATUS.Pre]: defaultPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: summary,
    },
    [SEASON_TYPE.Regular]: {
      [EVENT_STATUS.Pre]: defaultPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: summary,
    },
    [SEASON_TYPE.Postseason]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.AllStar]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.OffSeason]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.Unknown]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
  };

  if (!exists(seasonType)) throw new Error('Season type unavailable');

  const seasonTypeValid = SEASON_TYPE_LIST.includes(seasonType);

  return eventSummary[seasonTypeValid ? seasonType : SEASON_TYPE.Unknown][status ?? EVENT_STATUS.Pre];
}
