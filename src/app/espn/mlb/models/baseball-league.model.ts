import { BaseballTeam } from './baseball-team.model';

export interface BaseballLeagueProperties {
  teams: BaseballTeam[];
}

// TODO: Create new FE model
export type BaseballLeague = BaseballLeagueProperties;
