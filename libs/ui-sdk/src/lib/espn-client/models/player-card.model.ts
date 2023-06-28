import { IdAttributesNumber, PlayerInfo, PlayerRatings } from '../../espn/models/espn-client.model';

export type PlayerCardEntity = Pick<IdAttributesNumber, 'playerId'> & {
  player: PlayerInfo & {
    stance: PlayerStance;
    laterality: PlayerLaterality;
  };
  ratings: PlayerRatings;
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
