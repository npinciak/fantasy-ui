import { MLBClientPlayerAttributes, MLBClientSlateAttrTeam } from '../mlb/models/mlb-client.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';
import { ClientSite } from './daily-fantasy-client.model';

export interface ClientSlateAttributes {
  stat_groups: ClientSlateStatGroups;
  players: Record<string, NFLClientPlayerAttributes | NBAClientPlayerAttributes | MLBClientPlayerAttributes>;
  teams: Record<string, NBAClientSlateAttrTeam | NFLClientSlateAttrTeam | MLBClientSlateAttrTeam>;
}

export interface ClientPlayerAttributes {
  stat_group: string;
  salary_diff: SalaryDiffByDfsSiteType;
  slate_ownership: PlayerOwnershipByDfsSiteTypeBySlate;
  ownership: PlayerAttributesByDfsSite;
  value_pct: PlayerAttributesByDfsSite;
  smash_pct: PlayerAttributesByDfsSite | AttributesByDfsSite;
  stack_value: AttributesByDfsSite;
  top_value: AttributesByDfsSite;
  stack_leverage: AttributesByDfsSite;
  stack_field: AttributesByDfsSite;
  stack_diff: AttributesByDfsSite;
}

export interface ClientSalaryDiff {
  diff?: number;
  position: string;
  rank?: number;
  rank_diff?: number;
  salary: string;
}

export type AttributesByDfsSite = Partial<{ [site in ClientSite]: string }>;

export type SalaryDiffByDfsSiteType = Record<number, ClientSalaryDiff>;

export type ClientSlateStatGroups = NFLClientStatGroup | null | undefined;

export type ClientSlatePlayerAttributes = Partial<NFLClientPlayerAttributes & NBAClientPlayerAttributes & MLBClientPlayerAttributes>;
export type ClientSlatePlayerAttributesMap = Record<string, ClientSlatePlayerAttributes>;

export type ClientSlateTeamAttributes = Partial<NFLClientSlateAttrTeam & MLBClientSlateAttrTeam & NBAClientSlateAttrTeam>;
export type ClientSlateTeamAttributesMap = Record<string, ClientSlateTeamAttributes>;

export type PlayerAttributesByDfsSite = { [id: number]: string }; //Record<number, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<number, Record<number, string>>;
