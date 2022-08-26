import { enumAsList } from '@app/@shared/helpers/enum-as-list';

export enum FootballPosition {
  POS0,
  QB,
  RB,
  WR,
  TE,
  K,
  POS6,
  P,
  POS8,
  DT,
  DE,
  LB,
  CB,
  S,
  HC,
  TQB,
  DST,
  EDR,
}

export const FOOTBALL_POSITION_LIST = enumAsList(FootballPosition);
export const FOOTBALL_POSITION_LIST_DEFAULT = [
  FootballPosition.QB,
  FootballPosition.RB,
  FootballPosition.WR,
  FootballPosition.TE,
  FootballPosition.K,
  FootballPosition.DST,
];
