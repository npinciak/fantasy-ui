import { Team } from './team.model';

export interface BaseballLeagueProperties {
  teams: Team[];
}

// TODO: Create new FE model
export type BaseballLeague = BaseballLeagueProperties;
