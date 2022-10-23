import { Player } from './player.model';

/**
 * @deprecated
 */
export interface PlayerTableRowProperties {
  salary: number | null;
  siteId: string | null;
}
/**
 * @deprecated
 */
export type PlayerTableRow = Pick<Player, 'name' | 'team' | 'position'> & PlayerTableRowProperties;
