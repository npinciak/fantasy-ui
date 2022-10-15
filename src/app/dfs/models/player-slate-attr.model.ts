import { ClientSalaryDiff } from '@dfsClient/daily-fantasy-client-slate-attr.model';
import { Player } from './player.model';

/**
 * Base player slate attr model
 * @deprecated
 */
interface PlayerSlateAttrProperties {
  statGroup: string | null;
  salaryDiff: ClientSalaryDiff | null;
  slateOwn: Record<number, string> | null;
  ownership: number | null;
  value: number | null;
  smash: number | null;
}
/**
 * @deprecated
 */
export type PlayerSlateAttr = Pick<Player, 'id'> & PlayerSlateAttrProperties;
