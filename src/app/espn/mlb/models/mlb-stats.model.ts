import { StatEntity } from '@app/@shared/base-models/base-stats.model';
import { enumAsList } from 'sports-ui-sdk';

export enum PeriodId {
  Season,
  Last7,
  Last15,
  Last30,
}

export enum StatCategory {
  Batting = 1,
  Pitching,
}

export const PlayerRatingPeriodIdMap: { [key in PeriodId]: string } = {
  0: 'Season',
  1: 'Last 7',
  2: 'Last 15',
  3: 'Last 30',
};

export enum StatType {
  Batting = 1,
  Pitching,
  Defense,
}

export type EspnStatsEntityProps = StatEntity & {
  statCategoryId: StatCategory;
  statTypeId: StatType;
};

export type StatsMap = Record<number, EspnStatsEntityProps>;

type EspnBaseballStats =
  | 'ab'
  | 'h'
  | 'ha'
  | 'er'
  | 'avg'
  | '2b'
  | '3b'
  | 'hr'
  | 'xbh'
  | '1b'
  | 'tb'
  | 'slg'
  | 'bb'
  | 'ibb'
  | 'hbp'
  | 'sf'
  | 'sh'
  | 'sac'
  | 'pa'
  | 'obp'
  | 'ops'
  | 'rc'
  | 'r'
  | 'rbi'
  | 'gwrbi'
  | 'sb'
  | 'cs'
  | 'sbn'
  | 'gidp'
  | 'ko'
  | 'tp'
  | 'ppa'
  | 'gshr'
  | 'fc'
  | 'po'
  | 'ast'
  | 'ofast'
  | 'fpct'
  | 'e'
  | 'dpt'
  | 'btw'
  | 'btl'
  | 'ptw'
  | 'ptl'
  | 'gp'
  | 'gs'
  | 'w'
  | 'hra'
  | 'sv'
  | 'era'
  | 'whip'
  | 'ip'
  | 'bbi'
  | 'k'
  | 'hb';

export enum EspnBaseballStat {
  AB,
  H,
  AVG,
  DOUBLE,
  TRIPLE,
  HR,
  XBH,
  SINGLE,
  TB,
  SLG,
  BB,
  IBB,
  HBP,
  SF,
  SH,
  SAC,
  PA,
  OBP,
  OPS,
  RC,
  R,
  RBI,
  GWRBI,
  SB,
  CS,
  SBN,
  GIDP,
  KO,
  TP,
  PPA,
  CYC,
  GSHR,
  APP,
  GS,
  IP,
  BF,
  PC,
  HA,
  BAA,
  BBI,
  IBBI,
  WHIP,
  HB,
  OBA,
  RA,
  ER,
  HRA,
  ERA,
  K,
  K_9,
  WP,
  B,
  PKO,
  W,
  L,
  WIN_PCT,
  SOP,
  SV,
  BS,
  SV_PCT,
  HD,
  IRS,
  CG,
  QS,
  SO,
  NH,
  PG,
  FC,
  PO,
  AST,
  OFAST,
  FPCT,
  E,
  DPT,
  BTW,
  BTL,
  PTW,
  PTL,
  SFA,
  SHA,
  CIA,
  GP,
  K_BB,
  SVHD,
  PBS,
  fip = 100,
  wOBA,
  wRAA,
  BABIP,
  ISO,
  LOB_PCT,
}

export const BaseballStatList = enumAsList(EspnBaseballStat);
