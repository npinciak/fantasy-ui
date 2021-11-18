import { EspnClientGameStatus } from '../interface/player';
import { Player } from './player.model';

export interface BaseballPlayerProperties {
  playerImg: string;
  lineupSlot: number;
  defaultPosition: string;
  proTeam: string;
  isStarting: boolean;
  startingStatus: EspnClientGameStatus;
  isPitcher: boolean;
}

export type BaseballPlayer = BaseballPlayerProperties & Player;
