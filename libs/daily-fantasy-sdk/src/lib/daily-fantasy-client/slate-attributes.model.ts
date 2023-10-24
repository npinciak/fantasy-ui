import { ClientMlbSlatePlayerAttributes, ClientMlbSlateTeamAttributes } from '../models/mlb-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam } from '../models/nfl-client.model';

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
