import { LineupEntityMap } from '../../../espn/models/espn-client.model';
import { BaseballLineupSlot } from './lineup.model';

/**
 * Main baseball lineup slot map
 */
export const BASEBALL_LINEUP_MAP: LineupEntityMap = {
  [BaseballLineupSlot.C]: {
    abbrev: 'C',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [2],
    id: BaseballLineupSlot.C,
    lineupSlotEligible: true,
    name: 'Catcher',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.FirstBase]: {
    abbrev: '1B',
    active: true,
    bench: false,
    displayOrder: 1,
    eligiblePositions: [3],
    id: BaseballLineupSlot.FirstBase,
    lineupSlotEligible: true,
    name: 'First Base',
    parentId: 7,
    starter: true,
  },
  [BaseballLineupSlot.SecondBase]: {
    abbrev: '2B',
    active: true,
    bench: false,
    displayOrder: 2,
    eligiblePositions: [4],
    id: BaseballLineupSlot.SecondBase,
    lineupSlotEligible: true,
    name: 'Second Base',
    parentId: 6,
    starter: true,
  },
  [BaseballLineupSlot.ThirdBase]: {
    abbrev: '3B',
    active: true,
    bench: false,
    displayOrder: 3,
    eligiblePositions: [5],
    id: BaseballLineupSlot.ThirdBase,
    lineupSlotEligible: true,
    name: 'Third Base',
    parentId: 7,
    starter: true,
  },
  [BaseballLineupSlot.SS]: {
    abbrev: 'SS',
    active: true,
    bench: false,
    displayOrder: 4,
    eligiblePositions: [6],
    id: BaseballLineupSlot.SS,
    lineupSlotEligible: true,
    name: 'Shortstop',
    parentId: 6,
    starter: true,
  },
  [BaseballLineupSlot.OF]: {
    abbrev: 'OF',
    active: true,
    bench: false,
    displayOrder: 11,
    eligiblePositions: [7, 8, 9],
    id: BaseballLineupSlot.OF,
    lineupSlotEligible: true,
    name: 'Outfield',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.SecondOrSS]: {
    abbrev: '2B/SS',
    active: true,
    bench: false,
    displayOrder: 5,
    eligiblePositions: [4, 6],
    id: BaseballLineupSlot.SecondOrSS,
    lineupSlotEligible: true,
    name: 'Middle Infielder',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.FirstOrThird]: {
    abbrev: '1B/3B',
    active: true,
    bench: false,
    displayOrder: 6,
    eligiblePositions: [3, 5],
    id: BaseballLineupSlot.FirstOrThird,
    lineupSlotEligible: true,
    name: 'Corner Infielder',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.LF]: {
    abbrev: 'LF',
    active: true,
    bench: false,
    displayOrder: 8,
    eligiblePositions: [7],
    id: BaseballLineupSlot.LF,
    lineupSlotEligible: true,
    name: 'Left Field',
    parentId: 5,
    starter: true,
  },
  [BaseballLineupSlot.CF]: {
    abbrev: 'CF',
    active: true,
    bench: false,
    displayOrder: 9,
    eligiblePositions: [8],
    id: BaseballLineupSlot.CF,
    lineupSlotEligible: true,
    name: 'Center Field',
    parentId: 5,
    starter: true,
  },
  [BaseballLineupSlot.RF]: {
    abbrev: 'RF',
    active: true,
    bench: false,
    displayOrder: 10,
    eligiblePositions: [9],
    id: BaseballLineupSlot.RF,
    lineupSlotEligible: true,
    name: 'Right Field',
    parentId: 5,
    starter: true,
  },
  [BaseballLineupSlot.DH]: {
    abbrev: 'DH',
    active: true,
    bench: false,
    displayOrder: 12,
    eligiblePositions: [10],
    id: BaseballLineupSlot.DH,
    lineupSlotEligible: true,
    name: 'Designated Hitter',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.UTIL]: {
    abbrev: 'UTIL',
    active: true,
    bench: false,
    displayOrder: 13,
    eligiblePositions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    id: BaseballLineupSlot.UTIL,
    lineupSlotEligible: true,
    name: 'Utility',
    parentId: 21,
    starter: true,
  },
  [BaseballLineupSlot.P]: {
    abbrev: 'P',
    active: true,
    bench: false,
    displayOrder: 14,
    eligiblePositions: [1, 11],
    id: BaseballLineupSlot.P,
    lineupSlotEligible: true,
    name: 'Pitcher',
    parentId: 22,
    starter: true,
  },
  [BaseballLineupSlot.SP]: {
    abbrev: 'SP',
    active: true,
    bench: false,
    displayOrder: 15,
    eligiblePositions: [1],
    id: BaseballLineupSlot.SP,
    lineupSlotEligible: true,
    name: 'Starting Pitcher',
    parentId: 13,
    starter: true,
  },
  [BaseballLineupSlot.RP]: {
    abbrev: 'RP',
    active: true,
    bench: false,
    displayOrder: 16,
    eligiblePositions: [11],
    id: 15,
    lineupSlotEligible: true,
    name: 'Relief Pitcher',
    parentId: 13,
    starter: true,
  },
  [BaseballLineupSlot.BE]: {
    abbrev: 'BE',
    active: false,
    bench: true,
    displayOrder: 17,
    eligiblePositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    id: BaseballLineupSlot.BE,
    lineupSlotEligible: true,
    name: 'Bench',
    parentId: 23,
    starter: false,
  },
  [BaseballLineupSlot.IL]: {
    abbrev: 'IL',
    active: false,
    bench: false,
    displayOrder: 18,
    eligiblePositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    id: BaseballLineupSlot.IL,
    lineupSlotEligible: true,
    name: 'Injured List',
    parentId: 23,
    starter: false,
  },
  [BaseballLineupSlot.INV]: {
    abbrev: 'INV',
    active: false,
    bench: false,
    displayOrder: 19,
    eligiblePositions: [],
    id: BaseballLineupSlot.INV,
    lineupSlotEligible: false,
    name: 'Invalid Player',
    parentId: 23,
    starter: false,
  },
  [BaseballLineupSlot.IF]: {
    abbrev: 'IF',
    active: true,
    bench: false,
    displayOrder: 7,
    eligiblePositions: [3, 4, 5, 6],
    id: BaseballLineupSlot.IF,
    lineupSlotEligible: true,
    name: 'Infielder',
    parentId: 12,
    starter: true,
  },
  [BaseballLineupSlot.B]: {
    abbrev: 'B',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    id: BaseballLineupSlot.B,
    lineupSlotEligible: false,
    name: 'Batters',
    parentId: 21,
    starter: false,
  },
  [BaseballLineupSlot.P2]: {
    abbrev: 'P2',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [1, 11],
    id: BaseballLineupSlot.P2,
    lineupSlotEligible: false,
    name: 'Pitchers',
    parentId: 22,
    starter: false,
  },
  [BaseballLineupSlot.MISC]: {
    abbrev: 'MISC',
    active: true,
    bench: false,
    displayOrder: 0,
    id: BaseballLineupSlot.MISC,
    lineupSlotEligible: false,
    name: 'Miscellaneous',
    parentId: 23,
    starter: false,
    eligiblePositions: [],
  },
};

/**
 * Batting lineup slots
 */
export const BATTING_LINEUP_SLOTS = [
  BaseballLineupSlot.C,
  BaseballLineupSlot.FirstBase,
  BaseballLineupSlot.SecondBase,
  BaseballLineupSlot.ThirdBase,
  BaseballLineupSlot.SS,
  BaseballLineupSlot.OF,
  BaseballLineupSlot.SecondOrSS,
  BaseballLineupSlot.FirstOrThird,
  BaseballLineupSlot.LF,
  BaseballLineupSlot.CF,
  BaseballLineupSlot.RF,
  BaseballLineupSlot.DH,
  BaseballLineupSlot.UTIL,
] as const;

/**
 * Simplified display for common lineup slots.
 *
 * Excludes multi position lineup slots: LF, RF, 2B/SS, 2B/3B, etc.
 */
export const LINEUP_DISPLAY_LIST = [
  BaseballLineupSlot.FirstBase,
  BaseballLineupSlot.SecondBase,
  BaseballLineupSlot.SS,
  BaseballLineupSlot.ThirdBase,
  BaseballLineupSlot.C,
  BaseballLineupSlot.OF,
  BaseballLineupSlot.DH,
  BaseballLineupSlot.SP,
  BaseballLineupSlot.RP,
] as const;

/**
 * Pitching lineup slots
 */
export const PITCHING_LINEUP_SLOTS = [BaseballLineupSlot.P, BaseballLineupSlot.SP, BaseballLineupSlot.RP] as const;
export const PITCHING_LINEUP_IDS: Set<BaseballLineupSlot> = new Set([
  BaseballLineupSlot.P,
  BaseballLineupSlot.SP,
  BaseballLineupSlot.RP,
  BaseballLineupSlot.P2,
]);

export const BASEBALL_LINEUP_LIST = Object.values(BASEBALL_LINEUP_MAP);
export const BASEBALL_LINEUP_STARTERS = BASEBALL_LINEUP_LIST.filter(p => p.starter);
export const BASEBALL_LINEUP_BENCH = BASEBALL_LINEUP_LIST.filter(p => p.bench);
