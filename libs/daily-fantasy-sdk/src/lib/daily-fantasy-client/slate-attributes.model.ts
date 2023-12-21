import { ClientMlbSlatePlayerAttributes, ClientMlbSlateTeamAttributes } from '../models/mlb-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam } from '../models/nfl-client.model';
import { ClientSalaryDiff } from './salary-diff.model';
import { Site } from './site.model';

export type AttributesByDfsSite = Partial<Record<Site, string>>;
export type SalaryDiffByDfsSiteType = Record<number, ClientSalaryDiff>;
export type PlayerAttributesByDfsSite = Record<number, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<number, Record<number, string>>;

export type DfsClientSlateAttributes = {
  stack_value?: AttributesByDfsSite;
  top_value?: AttributesByDfsSite;
  stack_leverage?: AttributesByDfsSite;
  stack_field?: AttributesByDfsSite;
  stack_diff?: AttributesByDfsSite;
  xml_id: string;
  stat_group?: string;
  salary_diff?: SalaryDiffByDfsSiteType;
  slate_ownership?: PlayerOwnershipByDfsSiteTypeBySlate;
  ownership?: PlayerAttributesByDfsSite;
  value_pct?: PlayerAttributesByDfsSite;
  smash_pct?: PlayerAttributesByDfsSite | AttributesByDfsSite;
  injury_status?: string;
  props?: Record<string, string>;
  stats?: Record<string, string>;
};

type ClientSlatePlayerAttributesMap<PlayerAttributes> = Record<string, PlayerAttributes>;
type ClientSlateTeamAttributesMap<TeamAttributes> = Record<string, TeamAttributes>;

type ClientSlateAttributes<PlayerAttributes, TeamAttributes> = {
  players: ClientSlatePlayerAttributesMap<PlayerAttributes>;
  teams: ClientSlateTeamAttributesMap<TeamAttributes>;
};

export type ClientNflSlateAttributes = ClientSlateAttributes<NFLClientPlayerAttributes, NFLClientSlateAttrTeam>;
export type ClientMlbSlateAttributes = ClientSlateAttributes<ClientMlbSlatePlayerAttributes, ClientMlbSlateTeamAttributes>;

export type ClientNflSlatePlayerAttributesMap = ClientSlatePlayerAttributesMap<NFLClientPlayerAttributes>;
export type ClientMlbSlatePlayerAttributesMap = ClientSlatePlayerAttributesMap<ClientMlbSlatePlayerAttributes>;

export type ClientNflSlateTeamAttributesMap = ClientSlateTeamAttributesMap<NFLClientSlateAttrTeam>;
export type ClientMlbSlateTeamAttributesMap = ClientSlateTeamAttributesMap<ClientMlbSlateTeamAttributes>;
