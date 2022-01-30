import { PlayerAttributesByDfsSite, PlayerOwnershipByDfsSiteTypeBySlate, SalaryDiffByDfsSiteType } from '../nfl/models/nfl-client.model';
import { Player } from './player.model';

/**
 * Base player slate attr model
 */
interface PlayerSlateAttrProperties {
  statGroup: string;
  salaryDiff: SalaryDiffByDfsSiteType;
  slateOwn: PlayerOwnershipByDfsSiteTypeBySlate;
  ownership: PlayerAttributesByDfsSite;
  value: PlayerAttributesByDfsSite;
  smash: PlayerAttributesByDfsSite;
}

export type PlayerSlateAttr = Pick<Player, 'id'> & PlayerSlateAttrProperties;
