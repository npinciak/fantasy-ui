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

export const enum BaseballStat {
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
  wRC,
}
