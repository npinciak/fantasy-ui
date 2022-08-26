import { EspnClientScheduleEntity, EspnClientScheduleTeam } from '@client/espn-client.model';
import { FootballTeam } from './football-team.model';

export interface FantasyMatchupProperties {
  homeTeam: FantasyMatchupTeam;
  awayTeam: FantasyMatchupTeam;
}

export type FantasyMatchup = FantasyMatchupProperties & Pick<EspnClientScheduleEntity, 'id' | 'matchupPeriodId'>;
export type FantasyMatchupTeam = FootballTeam & Pick<EspnClientScheduleTeam, 'totalPoints'> & { rank: number; isWinner: boolean | null };
export type FantasyMatchupMap = Record<number, FantasyMatchup[]>;
