import { FantasyLeague } from '@app/espn/models/fantasy-league.model';
import { EspnClientScheduleEntity } from '@espnClient/espn-client.model';
import { FootballPlayerFreeAgent } from './football-player.model';
import { FootballTeam } from './football-team.model';

export interface FantasyFootballLeague extends FantasyLeague {
  teams: FootballTeam[];
  freeAgents: FootballPlayerFreeAgent[];
  schedule: EspnClientScheduleEntity[];
}
