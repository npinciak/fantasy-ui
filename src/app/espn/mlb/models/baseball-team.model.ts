import { Team } from '@app/espn/models/team.model';
import { BaseballPlayer } from './baseball-player.model';

export interface BaseballTeamProperties {
  abbrev: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
  rotoStats: Record<number, number>;
  liveScore: number;
  totalBattingRoto: number;
  totalPitchingRoto: number;
}

export type BaseballTeam = Omit<Team, 'record'> & Omit<BaseballTeamProperties, 'stats' | 'totalBattingRoto' | 'totalPitchingRoto'>;
export type BaseballTeamMap = Record<string, BaseballTeam>;

export type BaseballTeamLive = Pick<BaseballTeam, 'id' | 'totalPoints' | 'liveScore' | 'roster'>;
export type BaseballTeamLiveMap = Record<string, BaseballTeamLive>;

type StatsMapProperties = 'rotoStatsMap';
export type BaseballTeamTableRow = BaseballTeam | BaseballTeamLive; //& { [p in StatsMapProperties]: Partial<StatAbbrev> };
