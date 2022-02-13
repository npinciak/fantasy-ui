export enum StatCategory {
  Batting = 1,
  Pitching,
}

export enum StatTypePeriodId {
  regularSeason,
  last7Days,
  last15Days,
  last30Days,
  //currentYear = 4,?
  live = 5,
}

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
