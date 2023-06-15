import { Site } from '../daily-fantasy-client/site.model';
import { MLBClientPlayerAttributes, MLBClientSlateAttrTeam } from './mlb-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from './nfl-client.model';

export interface ClientSlateAttributes {
  stat_groups: ClientSlateStatGroups;
  players: Record<string, NFLClientPlayerAttributes | MLBClientPlayerAttributes>;
  teams: Record<string, NFLClientSlateAttrTeam | MLBClientSlateAttrTeam>;
}

type PlayerAttributes = 'stack_value' | 'top_value' | 'stack_leverage' | 'stack_field' | 'stack_diff';

export type DfsClientPlayerAttributes = { [key in PlayerAttributes]: AttributesByDfsSite } & {
  stat_group: string;
  salary_diff: SalaryDiffByDfsSiteType;
  slate_ownership: PlayerOwnershipByDfsSiteTypeBySlate;
  ownership: PlayerAttributesByDfsSite;
  value_pct: PlayerAttributesByDfsSite;
  smash_pct: PlayerAttributesByDfsSite | AttributesByDfsSite;
};

export interface ClientSalaryDiff {
  diff?: number;
  position: string;
  rank?: number;
  rank_diff?: number;
  salary: string;
}

export type AttributesByDfsSite = Partial<{ [site in Site]: string }>;

export type SalaryDiffByDfsSiteType = Record<number, ClientSalaryDiff>;

export type ClientSlateStatGroups = NFLClientStatGroup | null | undefined;

export type ClientSlatePlayerAttributes = Partial<NFLClientPlayerAttributes & MLBClientPlayerAttributes>;
export type ClientSlatePlayerAttributesMap = Record<string, ClientSlatePlayerAttributes>;

export type ClientSlateTeamAttributes = Partial<NFLClientSlateAttrTeam & MLBClientSlateAttrTeam>;
export type ClientSlateTeamAttributesMap = Record<string, ClientSlateTeamAttributes>;

export type PlayerAttributesByDfsSite = Record<number, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<number, Record<number, string>>;
