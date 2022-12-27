import { SportsUiClientLeague } from './sports-ui-league.model';

export namespace ClientSupaDefinitions {
  export type Leagues = SportsUiClientLeague;
  export type Teams = any;
}

export interface definitions {
  leagues: SportsUiClientLeague;
  teams: any;
}
