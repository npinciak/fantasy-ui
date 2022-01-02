import { Team } from '@app/espn/models/team.model';
import { StatAbbrev } from '../consts/stats.const';
import { BaseballPlayer } from './baseball-player.model';

export interface BaseballTeamProperties {
  abbrev: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
  stats: Partial<StatAbbrev>;
  rotoStats: Partial<StatAbbrev>;
  totalBattingRoto: number;
  totalPitchingRoto: number;
  liveScore: number;
}

export type BaseballTeam = BaseballTeamProperties & Team;
