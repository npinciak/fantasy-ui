import { SalaryDiff } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { Player } from './player.model';

/**
 * Base Dfs slate player model
 *
 */
type SlatePlayerAttributes = {
  statGroup: string | null;
  ownership: number | null;
  value: number | null;
  smash: number | null;
  salaryDiff: SalaryDiff | null;
  slateOwn: Record<number, string> | null;
};

/**
 *
 * @deprecated use import below
 *
 * @example import { SlatePlayer } from '@app/dfs/models/player.model';
 */
export type SlatePlayer = Pick<Player, 'id'> & SlatePlayerAttributes;
