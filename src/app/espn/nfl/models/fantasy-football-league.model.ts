import { FantasyLeague } from '@app/espn/models/fantasy-league.model';
import { EspnClient } from 'sports-ui-sdk';
import { FootballPlayerFreeAgent } from './football-player.model';
import { FootballTeam } from './football-team.model';

export interface FootballLeague extends FantasyLeague {
  teams: FootballTeam[];
  freeAgents: FootballPlayerFreeAgent[];
  schedule: EspnClient.ScheduleEntity[];
}
