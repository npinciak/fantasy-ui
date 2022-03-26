export enum StatCategory {
  Batting = 1,
  Pitching,
}

export enum StatTypePeriodId {
  RegularSeason,
  Last7Days,
  Last15Days,
  Last30Days,
  //currentYear = 4,?
  Live = 5,
  Unavail = 6,
  Projected = 10,
}

// 01 -- l7<year>
// 02 -- l15<year>
// 03 -- l30<year>
// 002021 -- regularSeason<?><year>
// 102022 -- proj<?><year>

export const StatTypePeriodIdMap: { [key in StatTypePeriodId]: string } = {
  0: 'Season',
  1: 'Last 7',
  2: 'Last 15',
  3: 'Last 30',
  5: 'live',
  6: 'NOT_MAPPED',
  10: 'Projected',
};

export enum StatType {
  Batting = 1,
  Pitching,
  Defense,
}

type StatsProperties = {
  abbrev: string;
  description: string;
  statCategoryId: StatCategory;
  statTypeId: StatType;
};

export type StatsMap = Record<string, Partial<StatsProperties>>;

type Stats =
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

export type StatAbbrev = {
  [P in Stats]: number;
};

export enum Stat {
  AB,
  H,
  AVG,
  '2B',
  '3B',
  HR,
  XBH,
  '1B',
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
  'K/9',
  WP,
  B,
  PKO,
  W,
  L,
  'WIN%',
  SOP,
  SV,
  BS,
  'SV%',
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
  'K/BB',
  SVHD,
  PBS,
  fip = 100,
  wOBA,
  wRAA,
  BABIP,
}
