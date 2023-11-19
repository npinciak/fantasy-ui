import { enumAsList } from '@sports-ui/ui-sdk/helpers';
import { API_BASE_V2, COMMON_V3, FANTASY_BASE_V2, FANTASY_BASE_V3, ONE_FEED_BASE } from '../espn.const';

/**
 * Utility class for building ESPN endpoints.
 */
export class EspnEndpointBuilder {
  private static readonly apiBaseV2 = API_BASE_V2;
  private static readonly fantasyBaseV3 = FANTASY_BASE_V3;
  private static readonly fantasyBaseV2 = FANTASY_BASE_V2;
  private static readonly oneFeedBase = ONE_FEED_BASE;
  private static readonly commonV3 = COMMON_V3;

  private _leagueId: string | undefined;
  private _sport: FantasySports | undefined;
  private _year: string;

  /**
   * Constructs an instance of EspnEndpointBuilder.
   * @param {FantasySports} sport - The fantasy sport.
   * @param {string} leagueId - The league ID.
   * @param {string} year - The year. Defaults to the current year.
   */
  constructor(sport?: FantasySports, leagueId?: string, year = new Date().getFullYear().toString()) {
    this._leagueId = leagueId;
    this._sport = sport;
    this._year = year;
  }

  /**
   * Gets the fantasy player news endpoint.
   * @returns {string} The endpoint URL.
   */
  get fantasyPlayerNews(): string {
    return `${this.fantasyBaseV2WithFragments}/news/players`;
  }

  /**
   * Gets the ESPN events endpoint.
   * @returns {string} The endpoint URL.
   */
  get espnEvents(): string {
    return `${this.fantasyBaseV2WithFragments}/games`;
  }

  /**
   * Gets the fantasy player transaction endpoint.
   * @returns {string} The endpoint URL.
   */
  get fantasyPlayerTransaction(): string {
    return `${this.fantasyLeague}/transactions`;
  }

  /**
   * Gets the fantasy league communications endpoint.
   * @returns {string} The endpoint URL.
   */
  get fantasyLeagueComms(): string {
    return `${this.fantasyLeague}/communication`;
  }

  /**
   * Gets the fantasy league endpoint.
   * @returns {string} The endpoint URL.
   */
  get fantasyLeague(): string {
    return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${this._leagueId}`;
  }

  /**
   * Gets the positions endpoint.
   * @returns {string} The endpoint URL.
   */
  get positions(): string {
    return `${EspnEndpointBuilder.commonV3}/${this._sport}/mlb/positions`;
  }

  /**
   * Gets the one feed endpoint.
   * @returns {string} The endpoint URL.
   */
  get oneFeed(): string {
    return `${EspnEndpointBuilder.oneFeedBase}/oneFeed`;
  }

  /**
   * Gets the static scoreboard endpoint.
   * @returns {string} The endpoint URL.
   */
  get staticScoreboard(): string {
    return `${EspnEndpointBuilder.apiBaseV2}/scoreboard/header`;
  }

  /**
   * Gets the baseball batter vs pitcher statistics endpoint.
   * @returns {string} The endpoint URL.
   */
  get baseballStatsBatterVsPitcher(): string {
    return `${this.fantasyBaseV2WithStatsFragments}/${EspnPathFragment.BatterVsPitcher}`;
  }

  private get fantasyBaseV3WithFragments(): string {
    return `${EspnEndpointBuilder.fantasyBaseV3}/games/${this._sport}/seasons/${this._year}`;
  }

  private get fantasyBaseV2WithFragments(): string {
    return `${EspnEndpointBuilder.fantasyBaseV2}/games/${this._sport}`;
  }

  private get fantasyBaseV2WithStatsFragments(): string {
    return `${this.fantasyBaseV2WithFragments}/${EspnPathFragment.Stats}`;
  }
}

export enum SportLeague {
  MLB = 'mlb',
  NFL = 'nfl',
  NHL = 'nhl',
  NBA = 'nba',
}

export enum Sports {
  football = 'football',
  baseball = 'baseball',
  tennis = 'tennis',
  mma = 'mma',
  golf = 'golf',
  hockey = 'hockey',
  basketball = 'basketball',
  soccer = 'soccer',
}

export enum FantasySports {
  Baseball = 'flb',
  Football = 'ffl',
  Basketball = 'fba',
  Hockey = 'fhl',
}

export const EspnPathFragment = {
  Stats: 'stats',
  BatterVsPitcher: 'bvp',
} as const;

export enum EspnParamFragment {
  ScoringPeriod = 'scoringPeriodId',
  View = 'view',
  UseMap = 'useMap',
  Dates = 'dates',
  Date = 'date',
  Days = 'days',
  PlayerId = 'playerId',
  PbpOnly = 'pbpOnly',
  BatterId = 'batterId',
}

export enum EspnViewParamFragment {
  Settings = 'mSettings',
  PlayerInfo = 'kona_player_info',
  LiveScoring = 'mLiveScoring',
  MatchupScore = 'mMatchupScore',
  Roster = 'mRoster',
  Scoreboard = 'mScoreboard',
  Team = 'mTeam',
  Transactions = 'mTransactions2',
  PendingTransactions = 'mPendingTransactions',
  Comms = 'kona_league_communication',
}

export const espnViewParamFragmentList = enumAsList(EspnViewParamFragment);

export const FantasySportToLabelMap: { [key in FantasySports]: string } = {
  [FantasySports.Baseball]: 'Baseball',
  [FantasySports.Football]: 'Football',
  [FantasySports.Hockey]: 'Hockey',
  [FantasySports.Basketball]: 'Basketball',
} as const;

export const FantasySportToSportLeagueMap: { [key in FantasySports]: SportLeague } = {
  [FantasySports.Baseball]: SportLeague.MLB,
  [FantasySports.Football]: SportLeague.NFL,
  [FantasySports.Hockey]: SportLeague.NHL,
  [FantasySports.Basketball]: SportLeague.NBA,
} as const;

export const LeagueSportToImageLocationMap: { [key in FantasySports]: string } = {
  [FantasySports.Baseball]: '-4px -272px',
  [FantasySports.Basketball]: '-4px -239px',
  [FantasySports.Football]: '-4px -206px',
  [FantasySports.Hockey]: '-4px -304px',
} as const;

export const SportToImageLocationMap = {
  [Sports.baseball]: '-4px -272px',
  [Sports.basketball]: '-4px -239px',
  [Sports.football]: '-4px -206px',
  [Sports.hockey]: '-4px -304px',
} as const;
