import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { EspnClient } from '@espnClient/espn-client.model';

export enum BaseballLineupSlot {
  C,
  FirstBase,
  SecondBase,
  ThirdBase,
  SS,
  OF,
  SecondOrSS,
  FirstOrThird,
  LF,
  CF,
  RF,
  DH,
  UTIL,
  P,
  SP,
  RP,
  BE,
  IL,
  INV,
  IF,
  B,
  P2,
  MISC,
}

export const mlbLineupList = enumAsList(BaseballLineupSlot);

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
];

export const PITCHING_LINEUP_SLOTS = [BaseballLineupSlot.P, BaseballLineupSlot.SP, BaseballLineupSlot.RP];

export const MLB_LINEUP_MAP: EspnClient.LineupEntityMap = {
  0: {
    abbrev: 'C',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [2],
    id: 0,
    lineupSlotEligible: true,
    name: 'Catcher',
    parentId: 12,
    starter: true,
  },
  1: {
    abbrev: '1B',
    active: true,
    bench: false,
    displayOrder: 1,
    eligiblePositions: [3],
    id: 1,
    lineupSlotEligible: true,
    name: 'First Base',
    parentId: 7,
    starter: true,
  },
  2: {
    abbrev: '2B',
    active: true,
    bench: false,
    displayOrder: 2,
    eligiblePositions: [4],
    id: 2,
    lineupSlotEligible: true,
    name: 'Second Base',
    parentId: 6,
    starter: true,
  },
  3: {
    abbrev: '3B',
    active: true,
    bench: false,
    displayOrder: 3,
    eligiblePositions: [5],
    id: 3,
    lineupSlotEligible: true,
    name: 'Third Base',
    parentId: 7,
    starter: true,
  },
  4: {
    abbrev: 'SS',
    active: true,
    bench: false,
    displayOrder: 4,
    eligiblePositions: [6],
    id: 4,
    lineupSlotEligible: true,
    name: 'Shortstop',
    parentId: 6,
    starter: true,
  },
  5: {
    abbrev: 'OF',
    active: true,
    bench: false,
    displayOrder: 11,
    eligiblePositions: [7, 8, 9],
    id: 5,
    lineupSlotEligible: true,
    name: 'Outfield',
    parentId: 12,
    starter: true,
  },
  6: {
    abbrev: '2B/SS',
    active: true,
    bench: false,
    displayOrder: 5,
    eligiblePositions: [4, 6],
    id: 6,
    lineupSlotEligible: true,
    name: 'Middle Infielder',
    parentId: 12,
    starter: true,
  },
  7: {
    abbrev: '1B/3B',
    active: true,
    bench: false,
    displayOrder: 6,
    eligiblePositions: [3, 5],
    id: 7,
    lineupSlotEligible: true,
    name: 'Corner Infielder',
    parentId: 12,
    starter: true,
  },
  8: {
    abbrev: 'LF',
    active: true,
    bench: false,
    displayOrder: 8,
    eligiblePositions: [7],
    id: 8,
    lineupSlotEligible: true,
    name: 'Left Field',
    parentId: 5,
    starter: true,
  },
  9: {
    abbrev: 'CF',
    active: true,
    bench: false,
    displayOrder: 9,
    eligiblePositions: [8],
    id: 9,
    lineupSlotEligible: true,
    name: 'Center Field',
    parentId: 5,
    starter: true,
  },
  10: {
    abbrev: 'RF',
    active: true,
    bench: false,
    displayOrder: 10,
    eligiblePositions: [9],
    id: 10,
    lineupSlotEligible: true,
    name: 'Right Field',
    parentId: 5,
    starter: true,
  },
  11: {
    abbrev: 'DH',
    active: true,
    bench: false,
    displayOrder: 12,
    eligiblePositions: [10],
    id: 11,
    lineupSlotEligible: true,
    name: 'Designated Hitter',
    parentId: 12,
    starter: true,
  },
  12: {
    abbrev: 'UTIL',
    active: true,
    bench: false,
    displayOrder: 13,
    eligiblePositions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    id: 12,
    lineupSlotEligible: true,
    name: 'Utility',
    parentId: 21,
    starter: true,
  },
  13: {
    abbrev: 'P',
    active: true,
    bench: false,
    displayOrder: 14,
    eligiblePositions: [1, 11],
    id: 13,
    lineupSlotEligible: true,
    name: 'Pitcher',
    parentId: 22,
    starter: true,
  },
  14: {
    abbrev: 'SP',
    active: true,
    bench: false,
    displayOrder: 15,
    eligiblePositions: [1],
    id: 14,
    lineupSlotEligible: true,
    name: 'Starting Pitcher',
    parentId: 13,
    starter: true,
  },
  15: {
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
  16: {
    abbrev: 'BE',
    active: false,
    bench: true,
    displayOrder: 17,
    eligiblePositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    id: 16,
    lineupSlotEligible: true,
    name: 'Bench',
    parentId: 23,
    starter: false,
  },
  17: {
    abbrev: 'IL',
    active: false,
    bench: false,
    displayOrder: 18,
    eligiblePositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    id: 17,
    lineupSlotEligible: true,
    name: 'Injured List',
    parentId: 23,
    starter: false,
  },
  18: {
    abbrev: 'INV',
    active: false,
    bench: false,
    displayOrder: 19,
    eligiblePositions: [],
    id: 18,
    lineupSlotEligible: false,
    name: 'Invalid Player',
    parentId: 23,
    starter: false,
  },
  19: {
    abbrev: 'IF',
    active: true,
    bench: false,
    displayOrder: 7,
    eligiblePositions: [3, 4, 5, 6],
    id: 19,
    lineupSlotEligible: true,
    name: 'Infielder',
    parentId: 12,
    starter: true,
  },
  20: {
    abbrev: 'B',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    id: 21,
    lineupSlotEligible: false,
    name: 'Batters',
    parentId: 21,
    starter: false,
  },
  21: {
    abbrev: 'P',
    active: true,
    bench: false,
    displayOrder: 0,
    eligiblePositions: [1, 11],
    id: 22,
    lineupSlotEligible: false,
    name: 'Pitchers',
    parentId: 22,
    starter: false,
  },
  22: {
    abbrev: 'MISC',
    active: true,
    bench: false,
    displayOrder: 0,
    id: 23,
    lineupSlotEligible: false,
    name: 'Miscellaneous',
    parentId: 23,
    starter: false,
    eligiblePositions: [],
  },
};

export const MLB_LINEUP_LIST = Object.values(MLB_LINEUP_MAP);
export const MLB_LINEUP_STARTERS = MLB_LINEUP_LIST.filter(p => p.starter);
export const MLB_LINEUP_BENCH = MLB_LINEUP_LIST.filter(p => p.bench);

export const PitcherIdSet: Set<BaseballLineupSlot> = new Set([
  BaseballLineupSlot.P,
  BaseballLineupSlot.SP,
  BaseballLineupSlot.RP,
  BaseballLineupSlot.P2,
]);
