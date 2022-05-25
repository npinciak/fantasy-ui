import { Schedule } from './schedule.model';
import { Team } from './team.model';

/**
 * Base player model
 */
type PlayerProperties = 'id' | 'rgId' | 'name' | 'teamId' | 'gameId' | 'img' | 'position';

export type Player = { [prop in PlayerProperties]: string } & { rgTeamId: string | null; team: string | null };
export type SlatePlayer = Omit<Player, 'img' | 'team'>;

/**
 * Base player-table-row.model
 */
interface PlayerTableDataProperties {
  salary: number | null;
  siteId: string | null;
}

export type PlayerTableData = PlayerTableDataProperties & Player;

export type PlayersBySlate = { players: SlatePlayer[]; schedule: Schedule[]; teams: Team[] };
