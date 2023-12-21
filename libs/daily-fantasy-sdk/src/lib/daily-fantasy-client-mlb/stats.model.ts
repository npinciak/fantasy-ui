type StatsProperties =
  | 'id'
  | 'name'
  | 'xwoba'
  | 'wellHitPct'
  | 'obp'
  | 'ops'
  | 'slg'
  | 'hbp'
  | 'hr/fb'
  | 'k'
  | 'sb'
  | 'gp'
  | 'ab'
  | 'woba'
  | 'iso'
  | 'babip'
  | 'avg'
  | 'k%'
  | 'bb%'
  | 'muwoba';

type StatSplitProperties = 'last-two' | 'season' | '12weeks' | '4weeks' | '2weeks' | '1week';

export type ClientMlbStats = Record<StatsProperties, string>;

export type ClientMlbStatSplit = Record<StatSplitProperties, ClientMlbStats> & {
  yesterday: Omit<ClientMlbStats, 'xwoba' | 'wellHitPct' | 'hbp' | 'hr/fb' | 'k' | 'sb' | 'gp'>;
};
