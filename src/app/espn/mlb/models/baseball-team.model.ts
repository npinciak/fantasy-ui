import { StatAbbrev } from '../consts/stats.const';
import { Team } from './team.model';

export interface BaseballTeamProperties {
  stats: StatAbbrev;
  rotoStats: StatAbbrev;
  totalBattingRoto: number;
  totalPitchingRoto: number;
  liveScore: number;
}

export type BaseballTeam = BaseballTeamProperties & Team;
