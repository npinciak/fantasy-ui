import { Player } from '@app/espn/models/player.model';

export interface BaseballPlayerProperties {
  playerImg: string;
  lineupSlot: number;
  defaultPosition: string;
  proTeam: string;
  isStarting: boolean;
  startingStatus: string;
  isPitcher: boolean;
  isInjured: boolean;
  injuryStatus: string;
  playerRatings: unknown;
  playerOwnership: {
    change: number;
    percentOwned: number;
  };
}

export type BaseballPlayer = Player & Partial<BaseballPlayerProperties>;
