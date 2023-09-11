import { API_BASE_V2, BASE_URL, COMMON_V3, FANTASY_BASE_V2, FANTASY_BASE_V3, ONE_FEED_BASE } from '../espn.const';
import { FantasySports } from '../models/espn-endpoint-builder.model';
import { ESPN_PATH_FRAGMENTS } from './base-espn-endpoints-builder.const';
import { BaseEspnEndpointBuilderClass, FantasySportToSportsMap, FantasySportsAbbreviation } from './base-espn-endpoints-builder.model';

/**
 * Creates a builder class for constructing ESPN API endpoint URLs.
 *
 * @param {Object} options - The configuration options for the builder.
 * @param {FantasySportsAbbreviation} options.sport - The abbreviation for the fantasy sport.
 * @param {string} options.leagueId - The ID of the league.
 * @param {string} options.year - The year of the season. Defaults to the current year.
 * @returns {BaseEspnEndpointBuilderClass} The builder class.
 *
 */
export function BaseEspnEndpointBuilder({
  sport = FantasySports.Baseball,
  leagueId,
  year = new Date().getFullYear().toString(),
}: {
  sport?: FantasySportsAbbreviation;
  leagueId?: string;
  year?: string;
}): BaseEspnEndpointBuilderClass {
  return class BaseEspnEndpointBuilderClass {
    private static readonly espnBase = BASE_URL;
    private static readonly apiBaseV2 = API_BASE_V2;
    private static readonly fantasyBaseV3 = FANTASY_BASE_V3;
    private static readonly fantasyBaseV2 = FANTASY_BASE_V2;
    private static readonly oneFeedBase = ONE_FEED_BASE;
    private static readonly commonV3 = COMMON_V3;

    /**
     * Gets the fantasy player news endpoint.
     * @returns {string} The endpoint URL.
     */
    static get fantasyPlayerNews(): string {
      return `${this.fantasyBaseV2WithFragments}/news/players`;
    }

    /**
     * Gets the ESPN events endpoint.
     * @returns {string} The endpoint URL.
     */
    static get espnEvents(): string {
      return `${this.fantasyBaseV2WithFragments}/games`;
    }

    /**
     * Gets the fantasy player transaction endpoint.
     * @returns {string} The endpoint URL.
     */
    static get fantasyPlayerTransaction(): string {
      return `${this.fantasyLeague}/transactions`;
    }

    /**
     * Gets the fantasy league communications endpoint.
     * @returns {string} The endpoint URL.
     */
    static get fantasyLeagueComms(): string {
      return `${this.fantasyLeague}/communication`;
    }

    /**
     * Gets the fantasy league endpoint.
     * @returns {string} The endpoint URL.
     */
    static get fantasyLeague(): string {
      return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${leagueId}`;
    }

    /**
     * Gets the positions endpoint.
     * @returns {string} The endpoint URL.
     */
    static get positions(): string {
      return `${BaseEspnEndpointBuilderClass.commonV3}/${sport}/mlb/positions`;
    }

    /**
     * Gets the one feed endpoint.
     * @returns {string} The endpoint URL.
     */
    static get oneFeed(): string {
      return `${BaseEspnEndpointBuilderClass.oneFeedBase}/oneFeed`;
    }

    /**
     * Gets the static scoreboard endpoint.
     * @returns {string} The endpoint URL.
     */
    static get staticScoreboard(): string {
      return `${BaseEspnEndpointBuilderClass.apiBaseV2}/scoreboard/header`;
    }

    static matchupClickout(teamId: string | number, matchupPeriodId: string | number): string {
      return `${this.espnBase}/${FantasySportToSportsMap[sport]}/boxscore?leagueId=${leagueId}&matchupPeriodId=${matchupPeriodId}&seasonId=${year}&teamId=${teamId}`;
    }

    /**
     * Gets the baseball batter vs pitcher statistics endpoint.
     * @returns {string} The endpoint URL.
     */
    static get baseballStatsBatterVsPitcher(): string {
      return `${this.fantasyBaseV2WithStatsFragments}/${ESPN_PATH_FRAGMENTS.BatterVsPitcher}`;
    }

    static get fantasyBaseV3WithFragments(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV3}/games/${sport}/seasons/${year}`;
    }

    private static get fantasyBaseV2WithFragments(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV2}/games/${sport}`;
    }

    private static get fantasyBaseV2WithStatsFragments(): string {
      return `${this.fantasyBaseV2WithFragments}/${ESPN_PATH_FRAGMENTS.Stats}`;
    }
  };
}
