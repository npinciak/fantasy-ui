// export interface ClientMlbSlatePlayerAttributesProperties {
//   hand: string;
//   stats: StatSplit;
//   batting_order: BattingOrder;
//   stat_group: string;
//   plateiq: PlateIq;
//   ecr: ExpertConsensusRankBySite;
// }

// type StatsProperties =
//   | 'id'
//   | 'name'
//   | 'xwoba'
//   | 'wellHitPct'
//   | 'obp'
//   | 'ops'
//   | 'slg'
//   | 'hbp'
//   | 'hr/fb'
//   | 'k'
//   | 'sb'
//   | 'gp'
//   | 'ab'
//   | 'woba'
//   | 'iso'
//   | 'babip'
//   | 'avg'
//   | 'k%'
//   | 'bb%'
//   | 'muwoba';

// type StatsPropertiesMap = { [prop in StatsProperties]: string };

// export interface StatSplit {
//   'last-two': StatsPropertiesMap;
//   season: StatsPropertiesMap;
//   '12weeks': StatsPropertiesMap;
//   '4weeks': StatsPropertiesMap;
//   '2weeks': StatsPropertiesMap;
//   '1week': StatsPropertiesMap;
//   yesterday: Pick<
//     StatsPropertiesMap,
//     'id' | 'name' | 'muwoba' | 'ab' | 'avg' | 'woba' | 'iso' | 'obp' | 'slg' | 'k%' | 'bb%' | 'ops' | 'babip'
//   >;
// }
