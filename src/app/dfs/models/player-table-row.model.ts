import { Player } from './player.model';

export interface PlayerTableRowProperties {
  salary: number | null;
  siteId: string | null;
}

export type PlayerTableRow = Pick<Player, 'name' | 'team' | 'position'> & PlayerTableRowProperties;
