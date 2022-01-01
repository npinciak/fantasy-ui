import { BaseballPlayer } from './baseball-player.model';

export interface TeamProperties {
  id: string;
  name: string;
  abbrev: string;
  logo: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
}

export type Team = TeamProperties;
