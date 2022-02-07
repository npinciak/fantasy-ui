import { Team } from '@app/espn/models/team.model';
import { BaseballPlayer } from './baseball-player.model';
import { StatAbbrev } from './mlb-stats.model';

export interface BaseballTeamProperties {
  abbrev: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
  rotoStats: Partial<StatAbbrev>;
  liveScore: number;
  stats: Partial<StatAbbrev>;
  totalBattingRoto: number;
  totalPitchingRoto: number;
}

export type BaseballTeam = Omit<Team, 'record'> &
  Omit<BaseballTeamProperties, 'liveScore' | 'stats' | 'totalBattingRoto' | 'totalPitchingRoto'>;

export type BaseballTeamMap = Record<string, BaseballTeam>;
