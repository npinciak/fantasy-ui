import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { BaseballPlayer } from './baseball-player.model';

interface BaseballTeamProps {
  abbrev: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
  rotoStats: Record<number, number>;
  liveScore: number;
}

export type BaseballTeam = TeamEntity & BaseballTeamProps;
export type BaseballTeamMap = Record<string, BaseballTeam>;

export type BaseballTeamLive = Pick<BaseballTeam, 'id' | 'totalPoints' | 'liveScore' | 'roster'>;
export type BaseballTeamLiveMap = Record<string, BaseballTeamLive>;

export type BaseballTeamTableRow = BaseballTeam | BaseballTeamLive;
