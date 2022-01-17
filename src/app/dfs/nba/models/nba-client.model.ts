import { ClientPlayerAttributes } from '@app/dfs/models/daily-fantasy-client-slate-sttr.model';
import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';

export interface RestEntity {
  b2b: number;
  '2in3': number;
  '3in4': number;
  '4in5': number;
}

export interface NBAClientTeamAttrProperties {
  rest: RestEntity;
}

export interface NBAClientPlayerAttributeProperties {
  dvp: unknown;
}

export type NBAClientSlateAttrTeam = SlateAttrTeamProperties & NBAClientTeamAttrProperties;
export type NBAClientPlayerAttributes = NBAClientPlayerAttributeProperties & ClientPlayerAttributes;
