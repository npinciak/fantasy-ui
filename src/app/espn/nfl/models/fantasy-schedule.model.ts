import { EspnClientScheduleEntity, EspnClientScheduleTeam } from '@espnClient/espn-client.model';
import { FootballTeam } from './football-team.model';

export type FantasyMatchup = Pick<EspnClientScheduleEntity, 'id' | 'matchupPeriodId'> & {
  homeTeam: FantasyMatchupTeam | null;
  awayTeam: FantasyMatchupTeam | null;
};

export type FantasyMatchupTeam = FootballTeam &
  Pick<EspnClientScheduleTeam, 'totalPoints' | 'totalProjectedPointsLive' | 'cumulativeScore'> & {
    currentPredictedWinPct: number;
    currentRank: number;
    isWinner: boolean | null;
  };
export type FantasyMatchupMap = Record<number, FantasyMatchup[]>;
