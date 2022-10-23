import { EspnClientLeagueSettings, EspnClientLeagueTransaction, EspnClientScheduleEntity } from '@espnClient/espn-client.model';
import { FootballPlayerFreeAgent } from './football-player.model';
import { FootballTeam } from './football-team.model';

export interface FantasyFootballLeague {
  leagueId: string | null;
  seasonId: string | null;
  currentScoringPeriodId: number | null;
  firstScoringPeriodId: number | null;
  finalScoringPeriodId: number | null;
  matchupPeriodCount: number | null;
  teams: FootballTeam[];
  freeAgents: FootballPlayerFreeAgent[];
  schedule: EspnClientScheduleEntity[];
  settings: EspnClientLeagueSettings;
  transactions: EspnClientLeagueTransaction[];
}
