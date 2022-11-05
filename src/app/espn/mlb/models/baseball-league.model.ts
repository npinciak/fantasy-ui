import { FantasyLeague } from '@app/espn/models/fantasy-league.model';
import { BaseballPlayer } from './baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from './baseball-team.model';

export interface BaseballLeague extends FantasyLeague {
  teamsLive: BaseballTeamLive[];
  teams: BaseballTeam[];
  freeAgents: BaseballPlayer[];
}
