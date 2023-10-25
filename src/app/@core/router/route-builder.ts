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
    static sportPathFragments(sport: string | null): string[] {
      return sport ? [basePath, sport] : [];
    }

    static seasonPathFragments(sport: string | null, season: string | null): string[] {
      return season ? [...RouteBuilderClass.sportPathFragments(sport), season] : [];
    }

    static leaguePathFragments(sport: string | null, season: string | null, leagueId: string | null): string[] {
      return season && leagueId ? [...RouteBuilderClass.seasonPathFragments(sport, season), UrlPathFragments.League, leagueId] : [];
    }

    static teamPathFragments(sport: string | null, season: string | null, leagueId: string | null, teamId: string | null): string[] {
      return sport && season && leagueId && teamId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.Team, teamId]
        : [];
    }

    static teamPitchersPathFragments(
      sport: string | null,
      season: string | null,
      leagueId: string | null,
      teamId: string | null
    ): string[] {
      return [...RouteBuilderClass.teamPathFragments(sport, season, leagueId, teamId), UrlPathFragments.Pitchers];
    }

    static teamBattersPathFragments(sport: string | null, season: string | null, leagueId: string | null, teamId: string | null): string[] {
      return [...RouteBuilderClass.teamPathFragments(sport, season, leagueId, teamId), UrlPathFragments.Batters];
    }

    static playerPathFragments(sport: string | null, season: string | null, leagueId: string | null, playerId: string | null): string[] {
      return season && playerId && leagueId
        ? [...RouteBuilderClass.leaguePathFragments(sport, season, leagueId), UrlPathFragments.Player, playerId]
        : [];
    }

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
