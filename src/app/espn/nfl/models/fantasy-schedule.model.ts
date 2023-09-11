import { EspnClient } from '@sports-ui/ui-sdk/espn';

import { FootballTeam } from './football-team.model';

export type FantasyMatchup = Pick<EspnClient.ScheduleEntity, 'id' | 'matchupPeriodId'> & {
  homeTeam: FantasyMatchupTeam | null;
  awayTeam: FantasyMatchupTeam | null;
  clickOutUrl: string;
};

export type FantasyMatchupTeam = FootballTeam &
  Pick<EspnClient.ScheduleTeam, 'totalPoints' | 'totalProjectedPointsLive' | 'cumulativeScore'> & {
    currentPredictedWinPct: number;
    currentRank: number;
    isWinner: boolean | null;
  };
export type FantasyMatchupMap = Record<number, FantasyMatchup[]>;
