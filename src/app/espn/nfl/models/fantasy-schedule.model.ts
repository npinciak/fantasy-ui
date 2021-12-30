import { EspnClientScheduleEntity, EspnClientScheduleTeam } from '@app/espn/espn-client.model';
import { FantasyTeam } from './fantasy-team.model';

export interface FantasyMatchupProperties {
  homeTeam: FantasyMatchupTeam;
  awayTeam: FantasyMatchupTeam;
}

export type FantasyMatchup = FantasyMatchupProperties & Pick<EspnClientScheduleEntity, 'id' | 'matchupPeriodId'>;
export type FantasyMatchupTeam = Pick<FantasyTeam, 'nickname' | 'location'> &
  Pick<EspnClientScheduleTeam, 'totalPoints'> & { isWinner: boolean | null };
