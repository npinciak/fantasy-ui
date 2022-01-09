import { DfsSlatePlayer, SlatePlayerEntity } from './daily-fantasy-client.model';

/**
 * Base player model
 */
interface PlayerProperties {
  id: string;
  name: string;
  img: string;
  team: string;
  position: string;
}

export type Player = PlayerProperties & Pick<SlatePlayerEntity, 'rg_id'> & Pick<DfsSlatePlayer, 'schedule'> & { teamId: string };
