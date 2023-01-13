import { UrlPathFragments } from './url-builder';

/***
 * Creates navigation path fragments
 *
 * @param basePath UrlPathFragments
 *
 * @example export class MyRouteBuilder extends RouteBuilder({ basePath: UrlPathFragments.Espn }) {}
 *
 */
export function RouteBuilder({ basePath }: { basePath: UrlPathFragments }) {
  class RouteBuilderClass {
    /**
     * Create base path based on sport input
     * @param sport
     * @returns string[]
     *
     * @example RouteBuilderClass.sportPathFragments('nfl') // returns ['espn','nfl']
     *
     */
    static sportPathFragments(sport: string | null): string[] {
      return sport ? [basePath, sport] : [];
    }

    /**
     * Creates season path based on sport and season input
     * @param sport
     * @param season
     * @returns string[]
     *
     * @example RouteBuilderClass.seasonPathFragments('nfl','2022') // returns ['espn','nfl','2022']
     *
     */
    static seasonPathFragments(sport: string | null, season: string | null): string[] {
      return season ? [...RouteBuilderClass.sportPathFragments(sport), season] : [];
    }

    /**
     * Creates league route for a fantasy league
     *
     * @param sport
     * @param season
     * @param leagueId
     * @returns string[]
     *
     * @example RouteBuilderClass.leaguePathFragments('nfl','2022','1234') // returns ['espn','nfl','2022','league','1234']
     *
     */
    static leaguePathFragments(sport: string | null, season: string | null, leagueId: string | null): string[] {
      return season && leagueId ? [...RouteBuilderClass.seasonPathFragments(sport, season), UrlPathFragments.League, leagueId] : [];
    }

    /**
     * Creates team route for a fantasy team
     *
     * @param sport
     * @param season
     * @param leagueId
     * @param teamId
     * @returns string[]
     *
     * @example RouteBuilderClass.teamPathFragments('nfl','2022','1234','1') // returns ['espn','nfl','2022','league','1234','team','1']
     *
     */
    static teamPathFragments(sport: string | null, season: string | null, leagueId: string | null, teamId: string | null): string[] {
      return sport && season && leagueId && teamId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.Team, teamId]
        : [];
    }

    /**
     * Creates free agents route for a fantasy league
     * @param sport
     * @param season
     * @param leagueId
     * @returns string[]
     *
     * @example RouteBuilderClass.freeAgentsPathFragments('nfl','2022','1234') // returns ['espn','nfl','2022','league','1234','free-agents']
     *
     */
    static freeAgentsPathFragments(sport: string | null, season: string | null, leagueId: string | null): string[] {
      return sport && season && leagueId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.FreeAgents]
        : [];
    }
  }
  return RouteBuilderClass;
}

export class EspnRouteBuilder extends RouteBuilder({ basePath: UrlPathFragments.Espn }) {}

export class DfsRouteBuilder extends RouteBuilder({ basePath: UrlPathFragments.Dfs }) {}

// espn/2022/nfl/12434/team/10
// espn/2022/football/12434/team/10

// espn/football/2022/league/1123/team

// espn/nfl?season=2022&league=1234&team=10
// espn/football?season=2022&league=1234&team=10

// [season,'nfl',leagueId,'team',teamId]
