import { CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import { ClientSalaryDiff } from './daily-fantasy-client-slate-attr.model';
import { Player } from './player.model';

/**
 * Base player slate attr model
 */
interface PlayerSlateAttrProperties {
  statGroup: string;
  salaryDiff: ClientSalaryDiff;
  slateOwn: Record<number, string>;
  ownership: number;
  value: number;
  smash: number;
}

export type PlayerSlateAttr = Pick<Player, 'id'> & PlayerSlateAttrProperties;
