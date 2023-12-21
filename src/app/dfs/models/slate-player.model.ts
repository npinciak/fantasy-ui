import { ClientSalaryDiff } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { Player } from './player.model';

/**
 * Base Dfs slate player model
 *
 */
export type SlatePlayerAttributeDetails = {
  id: string;
  statGroup: string | null;
  ownership: number | null;
  value: number | null;
  smash: number | null;
  salaryDiff: ClientSalaryDiff | null;
  slateOwn: Record<number, string> | null;
};

/**
 *
 * @deprecated use import below
 *
 * @example import { SlatePlayer } from '@app/dfs/models/player.model';
 */
export type SlatePlayer = Pick<Player, 'id'> & SlatePlayerAttributeDetails;
