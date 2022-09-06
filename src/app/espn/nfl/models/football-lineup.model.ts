import { enumAsList } from '@app/@shared/helpers/enum-as-list';

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
