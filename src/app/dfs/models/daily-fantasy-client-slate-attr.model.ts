import { MLBClientSlateAttrTeam } from '../mlb/models/mlb-client.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';

export interface ClientSlateAttributes {
  stat_groups: ClientSlateStatGroups;
  players: Record<string, NFLClientPlayerAttributes | NBAClientPlayerAttributes>;
  teams: Record<string, NBAClientSlateAttrTeam | NFLClientSlateAttrTeam | MLBClientSlateAttrTeam>;
}

export interface ClientPlayerAttributes {
  stat_group: string;
  salary_diff: SalaryDiffByDfsSiteType;
  slate_ownership: PlayerOwnershipByDfsSiteTypeBySlate;
  ownership: PlayerAttributesByDfsSite;
  value_pct: PlayerAttributesByDfsSite;
  smash_pct: PlayerAttributesByDfsSite;
}

export interface ClientSalaryDiff {
  diff?: number;
  position: string;
  rank?: number;
  rank_diff?: number;
  salary: string;
}

export type SalaryDiffByDfsSiteType = Record<number, ClientSalaryDiff>;

export type ClientSlateStatGroups = NFLClientStatGroup | null | undefined;

export type ClientSlatePlayerAttributes = NFLClientPlayerAttributes | NBAClientPlayerAttributes;
export type ClientSlatePlayerAttributesMap = Record<string, ClientSlatePlayerAttributes>;

export type ClientSlateTeamAttributes = NFLClientSlateAttrTeam | MLBClientSlateAttrTeam | NBAClientSlateAttrTeam;
export type ClientSlateTeamAttributesMap = Record<string, ClientSlateTeamAttributes>;

export type PlayerAttributesByDfsSite = { [id: number]: string }; //Record<number, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<number, Record<number, string>>;
