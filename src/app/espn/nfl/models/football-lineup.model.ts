import { enumAsList, FootballLineup } from 'sports-ui-sdk';

export enum FootballLineupSlot {
  QB,
  TQB,
  RB,
  RBORWR,
  WR,
  WRORTE,
  TE,
  OP,
  DT,
  DE,
  LB,
  DL,
  CB,
  S,
  DB,
  DP,
  DST,
  K,
  P,
  HC,
  BE,
  IR,
  INV,
  FLEX,
  EDR,
  ALL,
}

export const FootballLineupSlotList = enumAsList(FootballLineupSlot);
export const BasicFootballLineupSlotList: FootballLineupSlot[] = [
  FootballLineupSlot.QB,
  FootballLineupSlot.RB,
  FootballLineupSlot.WR,
  FootballLineupSlot.FLEX,
  FootballLineupSlot.K,
  FootballLineupSlot.DST,
];

export const BasicFootballLineupSlotFilterOptions = BasicFootballLineupSlotList.map(s => ({
  value: s,
  label: FootballLineup.LineupSlotMap[s].name,
}));
