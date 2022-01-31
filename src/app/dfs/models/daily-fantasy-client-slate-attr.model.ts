import { MLBClientSlateAttrTeam } from '../mlb/models/mlb-client.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam } from '../nba/models/nba-client.model';
import {
  NFLClientPlayerAttributes,
  NFLClientSlateAttrTeam,
  NFLClientStatGroup,
  PlayerAttributesByDfsSite,
  PlayerOwnershipByDfsSiteTypeBySlate,
  SalaryDiffByDfsSiteType,
} from '../nfl/models/nfl-client.model';

export interface ClientSlateAttributes {
  stat_groups: NFLClientStatGroup;
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

export type ClientSlateStatGroups = NFLClientStatGroup;

export type ClientSlatePlayerAttributes = NFLClientPlayerAttributes | NBAClientPlayerAttributes;
export type ClientSlatePlayerAttributesMap = Record<string, ClientSlatePlayerAttributes>;

export type ClientSlateTeamAttributes = NFLClientSlateAttrTeam | MLBClientSlateAttrTeam | NBAClientSlateAttrTeam;
export type ClientSlateTeamAttributesMap = Record<string, ClientSlateTeamAttributes>;
