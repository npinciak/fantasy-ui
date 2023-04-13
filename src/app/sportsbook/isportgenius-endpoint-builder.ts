import { environment } from 'src/environments/environment';

export class ISportGeniusEndpointBuilder {
  private static apiBase = environment.isportgeniusBase;

  constructor() {}

  /**
   *
   * @param sport
   * @param league
   * @returns
   * 
   * @example
   ```typescript
   *  teamsList('basketball','nba') // returns `/teamslist/basketball/nba`
   * ```
   */
  teamsList(sport: string, league: string): string {
    return `${ISportGeniusEndpointBuilder.apiBase}/teamslist/${sport}/${league}`;
  }

  /**
   *
   * @param leagueId
   * @returns
   *
   * @example
   * ```typescript
   *  leagueStats(1) // returns `/league-stats/1`
   * ```
   */
  leagueStats(leagueId: string): string {
    return `${ISportGeniusEndpointBuilder.apiBase}/league-stats/${leagueId}`;
  }
}

export const LEAGUE_ID = {
  MLB: '1000093616',
  NBA: '1000093652',
  NCAAM: '1000093654',
  NHL: '1000093657',
  NFL: '1000093656',
  UEFA_CHAMPIONS_LEAGUE: '1000093381',
};
