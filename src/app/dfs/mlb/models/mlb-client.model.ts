import { ClientPlayerAttributes } from '@app/dfs/models/daily-fantasy-client-slate-attr.model';
import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';
import { PlayerEcrByDfsSiteType } from '@app/dfs/nfl/models/nfl-client.model';

export type MLBClientStatGroup = 'mlb-hitter' | 'mlb-pitcher';

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

export interface MLBClientTeamAttrProperties {
  pitcher: MLBClientPitcherAttr;
  team_total: number;
}

export interface MLBClientPlayerAttributeProperties {
  hand: string;
  stats: StatSplit;
  batting_order: BattingOrder;
  stat_group: MLBClientStatGroup;
  plateiq: PlateIq;
  ecr: PlayerEcrByDfsSiteType;
}

export interface StatSplit {
  'last-two': Stats;
  season: Stats;
  '12weeks': Stats;
  '4weeks': Stats;
  '2weeks': Stats;
  '1week': Stats;
  yesterday: Pick<Stats, 'id' | 'name' | 'muwoba' | 'ab' | 'avg' | 'woba' | 'iso' | 'obp' | 'slg' | 'k%' | 'bb%' | 'ops' | 'babip'>;
}

export interface Stats {
  id: string;
  name: string;
  xwoba: string;
  wellHitPct: string;
  obp: string;
  ops: string;
  slg: string;
  hbp: string;
  'hr/fb': string;
  k: string;
  sb: string;
  gp: string;
  ab: string;
  woba: string;
  iso: string;
  babip: string;
  avg: string;
  'k%': string;
  'bb%': string;
  muwoba: string;
}

export interface BattingAttributes {
  batting_order: BattingOrder;
}

export interface BattingOrder {
  order: string;
  confirmed: number;
}

export interface PlateIq {
  score: PlateIqScore;
  factors: PlateIqFactors;
}

export interface PlateIqScore {
  contact: number;
  context: number;
  pitchTypes: number;
  production: number;
  plateDiscipline: number;
  recentSkill: number;
  stolenBase: number;
  sbFactor: number;
  overall: number;
}
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
export type MLBClientPlayerAttributes = MLBClientPlayerAttributeProperties &
  Pick<ClientPlayerAttributes, 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct' | 'smash_pct'>;
export type MLBClientTeamAttributes = MLBClientTeamAttrProperties & ValueProperties;
