import { ClientSalaryDiff } from './daily-fantasy-client-slate-attr.model';
import { Player } from './player.model';

/**
 * Base player slate attr model
 */
interface PlayerSlateAttrProperties {
  statGroup: string | null;
  salaryDiff: ClientSalaryDiff | null;
  slateOwn: Record<number, string> | null;
  ownership: number | null;
  value: number | null;
  smash: number | null;
}

export type PlayerSlateAttr = Pick<Player, 'id'> & PlayerSlateAttrProperties;
