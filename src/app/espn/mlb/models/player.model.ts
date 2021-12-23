import { EspnClientPlayerRatings } from '../interface/player';

export interface Player {
  id: string;
  name: string;
  isInjured: boolean;
  injuryStatus: string;
  playerRatings: EspnClientPlayerRatings;
  playerOwnership: {
    change: number;
    percentOwned: number;
  };
}
