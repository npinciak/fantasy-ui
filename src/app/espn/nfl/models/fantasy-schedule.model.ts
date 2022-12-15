import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';
import { FootballTeam } from './football-team.model';

export type FantasyMatchup = Pick<EspnClient.ScheduleEntity, 'id' | 'matchupPeriodId'> & {
  homeTeam: FantasyMatchupTeam | null;
  awayTeam: FantasyMatchupTeam | null;
};

export type FantasyMatchupTeam = FootballTeam &
  Pick<EspnClient.ScheduleTeam, 'totalPoints' | 'totalProjectedPointsLive' | 'cumulativeScore'> & {
    currentPredictedWinPct: number;
    currentRank: number;
    isWinner: boolean | null;
  };
export type FantasyMatchupMap = Record<number, FantasyMatchup[]>;
