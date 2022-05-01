import { Schedule } from './schedule.model';
import { Team } from './team.model';

/**
 * Base player model
 */
interface PlayerProperties {
  id: string;
  name: string;
  img: string;
  team: string | null;
  position: string;
}

export type Player = PlayerProperties & { rgId: string | null; teamId: string | null; rgTeamId: string | null; gameId: string | null };
export type PlayerMap = Record<string, Player>;

export type SlatePlayer = Omit<Player, 'img' | 'team'>;
export type SlatePlayerMap = Record<string, Omit<Player, 'img' | 'team'>>;

/**
 * Base player-table-row.model
 */
interface PlayerTableDataProperties {
  salary: number | null;
  siteId: string | null;
}

export type PlayerTableData = PlayerTableDataProperties & PlayerProperties;

export type PlayersBySlate = { players: SlatePlayer[]; schedule: Schedule[]; teams: Team[] };
