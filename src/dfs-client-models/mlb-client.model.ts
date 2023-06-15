import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';
import { DfsClientPlayerAttributes } from '@dfsClient/daily-fantasy-client-slate-attr.model';

export type ValueProperties = {
  stack_value: string;
  top_value: string;
  smash_value: string;
  stack_leverage: string;
  stack_field: string;
  stack_diff: string;
};

export interface MLBClientPitcherAttr {
  last_name: string;
  first_name: string;
  hand: 'L' | 'R';
  id: string;
}

export type MLBClientTeamAttrProperties = Omit<
  DfsClientPlayerAttributes,
  'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'
> & {
  pitcher: MLBClientPitcherAttr;
  team_total: number;
};

export interface StatSplit {
  'last-two': StatsPropertiesMap;
  season: StatsPropertiesMap;
  '12weeks': StatsPropertiesMap;
  '4weeks': StatsPropertiesMap;
  '2weeks': StatsPropertiesMap;
  '1week': StatsPropertiesMap;
  yesterday: Pick<
    StatsPropertiesMap,
    'id' | 'name' | 'muwoba' | 'ab' | 'avg' | 'woba' | 'iso' | 'obp' | 'slg' | 'k%' | 'bb%' | 'ops' | 'babip'
  >;
}

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

type StatsPropertiesMap = { [prop in StatsProperties]: string };

export interface BattingAttributes {
  batting_order: BattingOrder;
}

export interface BattingOrder {
  order: string;
  confirmed: number;
}

export interface PlateIq {
  score: { [prop in PlateIqScoreProperties]: number };
  factors: PlateIqFactors;
}

type PlateIqScoreProperties =
  | 'contact'
  | 'context'
  | 'pitchTypes'
  | 'Production'
  | 'plateDiscipline'
  | 'recentSkill'
  | 'stolenBase'
  | 'sbFactor'
  | 'overall';

export interface PlateIqFactors {
  positive: FactorEntity[] | null;
  negative: FactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
}
export interface FactorEntity {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
}

export type MLBClientSlateAttrTeam = SlateAttrTeamProperties & MLBClientTeamAttrProperties;
export type MLBClientTeamAttributes = MLBClientTeamAttrProperties & ValueProperties;
