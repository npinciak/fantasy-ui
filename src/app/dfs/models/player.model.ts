import { Schedule } from './schedule.model';
import { Team } from './team.model';

/**
 * Base player model
 */
interface PlayerProperties {
  id: string | null;
  name: string | null;
  img: string | null;
  team: string | null;
  position: string | null;
}

export type Player = PlayerProperties & { rgId: string | null; teamId: string | null; rgTeamId: string | null; gameId: string | null };
export type PlayerMap = Record<string, Player>;

export type SlatePlayer = Omit<Player, 'img' | 'team'>;
export type SlatePlayerMap = Record<string, Omit<Player, 'img' | 'team'>>;

/**
 * Base player-table-row.model
 */
interface PlayerTableRowProperties {
  salary: number | null;
  siteId: string | null;
}

export type PlayerTableRow = PlayerTableRowProperties & PlayerProperties;

export type PlayersBySlate = { players: SlatePlayer[]; schedule: Schedule[]; teams: Team[] };
