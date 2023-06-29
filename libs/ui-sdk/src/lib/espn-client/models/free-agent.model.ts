import { PlayerEntry, PlayerInfo } from './player.model';

export type FreeAgentEntry = PlayerEntry;
export type FreeAgent = FreeAgentEntry;
export type FreeAgentPlayerInfo = Omit<PlayerInfo, 'playerId'>;
