import { BaseballPlayer } from './baseball-player.model';

export interface Team {
  id: string;
  name: string;
  abbrev: string;
  logo: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
}
