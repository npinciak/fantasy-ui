import { Player } from './player.model';

export interface BaseballPlayerProperties {
  playerImg: string;
  lineupSlot: number;
  defaultPosition: string;
  proTeam: string;
  isStarting: boolean;
  startingStatus: string;
  isPitcher: boolean;
}

export type BaseballPlayer = Partial<BaseballPlayerProperties> & Player;
