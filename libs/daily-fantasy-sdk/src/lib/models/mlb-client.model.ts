import { ExpertConsensusRankBySite } from '../daily-fantasy-client/expert-consensus-ranking.model';
import { DfsClientSlateAttributes } from '../daily-fantasy-client/slate-attributes.model';
import { ClientVegas } from '../daily-fantasy-client/vegas.model';

export type ValueProperties = {
  stack_value: string;
  top_value: string;
  smash_value: string;
  stack_leverage: string;
  stack_field: string;
  stack_diff: string;
};

export interface ClientMlbPitcherAttributes {
  last_name: string;
  first_name: string;
  hand: 'L' | 'R';
  id: string;
}

export type ClientMlbSlateTeamAttributesProperties = Omit<
  DfsClientSlateAttributes,
  'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'
> & {
  pitcher: ClientMlbPitcherAttributes;
  team_total: number;
};

export interface ClientMlbSlatePlayerAttributesProperties {
  hand: string;
  stats: StatSplit;
  batting_order: BattingOrder;
  stat_group: string;
  plateiq: PlateIq;
  ecr: ExpertConsensusRankBySite;
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
  positive: PlateIqFactorEntity[] | null;
  negative: PlateIqFactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
}

export type PlateIqFactorEntity = {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
};

export type ClientMlbSlateTeamAttributes = { vegas: ClientVegas } & ClientMlbSlateTeamAttributesProperties;
export type ClientMlbSlatePlayerAttributes = ClientMlbSlatePlayerAttributesProperties &
  Omit<DfsClientSlateAttributes, 'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'>;
export type MLBClientTeamAttributes = ClientMlbSlateTeamAttributesProperties & ValueProperties;
