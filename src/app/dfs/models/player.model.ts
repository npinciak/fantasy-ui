import { ClientSalaryEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { Schedule } from './schedule.model';
import { Team } from './team.model';

/**
 * Base player model
 */
type PlayerAttributes = 'id' | 'rgId' | 'name' | 'teamId' | 'gameId' | 'img' | 'position';
export type Player = { [attribute in PlayerAttributes]: string } & { rgTeamId: string | null; team: string | null };

export type SlatePlayer = Omit<Player, 'img' | 'team'> & { salaries: ClientSalaryEntity[] | null };

/**
 * Base player-table-row.model
 */
interface PlayerTableDataProperties {
  salary: number | null;
  siteId: string | null;
}

/**
 * @deprecated
 */
export type PlayerTableData = PlayerTableDataProperties & Player;
/**
 * @deprecated
 */
export type PlayersBySlate = { players: SlatePlayer[]; schedule: Schedule[]; teams: Team[] };
