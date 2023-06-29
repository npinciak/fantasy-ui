import { IdAttributesNumber } from './id-attributes.model';
import { PlayerEntry, PlayerInfo } from './player.model';

export type PlayerCardEntity = Pick<IdAttributesNumber, 'playerId'> &
  Pick<PlayerEntry, 'ratings'> & {
    player: PlayerInfo & {
      stance: PlayerStance;
      laterality: PlayerLaterality;
    };
  };

export type PlayerStance = typeof STANCE[keyof typeof STANCE];

export const STANCE = {
  Left: 'LEFT',
  Right: 'RIGHT',
  Both: 'BOTH',
} as const;

export type PlayerLaterality = typeof LATERALITY[keyof typeof LATERALITY];

export const LATERALITY = {
  Left: 'LEFT',
  Right: 'RIGHT',
} as const;
