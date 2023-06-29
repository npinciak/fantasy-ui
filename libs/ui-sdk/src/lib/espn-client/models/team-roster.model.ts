import { IdAttributesNumber } from './id-attributes.model';
import { PlayerEntry } from './player.model';

export type TeamRoster = { entries: TeamRosterEntry[] };
export type TeamRosterEntry = Pick<IdAttributesNumber, 'playerId' | 'lineupSlotId'> & { playerPoolEntry?: PlayerEntry };
