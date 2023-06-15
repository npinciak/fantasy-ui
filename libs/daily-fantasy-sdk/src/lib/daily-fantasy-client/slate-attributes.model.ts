import { MLBClientPlayerAttributes, MLBClientSlateAttrTeam } from '../models/mlb-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../models/nfl-client.model';

export interface ClientSlateAttributes {
  stat_groups: ClientSlateStatGroups;
  players: Record<string, NFLClientPlayerAttributes | MLBClientPlayerAttributes>;
  teams: Record<string, NFLClientSlateAttrTeam | MLBClientSlateAttrTeam>;
}

export type ClientSlateStatGroups = NFLClientStatGroup | null | undefined;

export type ClientSlatePlayerAttributes = Partial<NFLClientPlayerAttributes & MLBClientPlayerAttributes>;
export type ClientSlatePlayerAttributesMap = Record<string, ClientSlatePlayerAttributes>;

export type ClientSlateTeamAttributes = Partial<NFLClientSlateAttrTeam & MLBClientSlateAttrTeam>;
export type ClientSlateTeamAttributesMap = Record<string, ClientSlateTeamAttributes>;
