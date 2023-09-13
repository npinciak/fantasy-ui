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
     * @example RouteBuilderClass.sportPathFragments('football') // returns ['espn','football']
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
     * @example RouteBuilderClass.seasonPathFragments('football','2022') // returns ['espn','football','2022']
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
     * @example RouteBuilderClass.leaguePathFragments('football','2022','1234') // returns ['espn','football','2022','league','1234']
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
     * @example RouteBuilderClass.teamPathFragments('football','2022','1234','1') // returns ['espn','football','2022','league','1234','team','1']
     *
     */
    static teamPathFragments(sport: string | null, season: string | null, leagueId: string | null, teamId: string | null): string[] {
      return sport && season && leagueId && teamId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.Team, teamId]
        : [];
    }

    /**
     * Creates team pitcher's route for a fantasy team
     *
     * @param sport
     * @param season
     * @param leagueId
     * @param teamId
     * @returns string[]
     *
     * @example RouteBuilderClass.teamPitchersPathFragments('mlb','2022','1234','1') // returns ['espn','mlb','2022','league','1234','team','1','pitchers']
     *
     */
    static teamPitchersPathFragments(
      sport: string | null,
      season: string | null,
      leagueId: string | null,
      teamId: string | null
    ): string[] {
      return [...RouteBuilderClass.teamPathFragments(sport, season, leagueId, teamId), UrlPathFragments.Pitchers];
    }

    /**
     * Creates team batter's route for a fantasy team
     *
     * @param sport
     * @param season
     * @param leagueId
     * @param teamId
     * @returns string[]
     *
     * @example RouteBuilderClass.teamBattersPathFragments('mlb','2022','1234','1') // returns ['espn','mlb','2022','league','1234','team','1','batters']
     *
     */
    static teamBattersPathFragments(sport: string | null, season: string | null, leagueId: string | null, teamId: string | null): string[] {
      return [...RouteBuilderClass.teamPathFragments(sport, season, leagueId, teamId), UrlPathFragments.Batters];
    }

    /**
     * Creates player route for a fantasy player
     *
     * @param sport
     * @param season
     * @param leagueId
     * @param playerId
     * @returns string[]
     *
     * @example RouteBuilderClass.playerPathFragments('football','2022','1234','1') // returns ['espn','football','2022','league','1234','player','1']
     *
     */
    static playerPathFragments(sport: string | null, season: string | null, leagueId: string | null, playerId: string | null): string[] {
      return season && playerId && leagueId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.Player, playerId]
        : [];
    }

    /**
     * Creates free agents route for a fantasy league
     * @param sport
     * @param season
     * @param leagueId
     * @returns string[]
     *
     * @example RouteBuilderClass.freeAgentsPathFragments('football','2022','1234') // returns ['espn','football','2022','league','1234','free-agents']
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
