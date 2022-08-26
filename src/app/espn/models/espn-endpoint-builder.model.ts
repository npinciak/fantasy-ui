import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { COMMON_V3, FANTASY_BASE_V2, FANTASY_BASE_V3, ONE_FEED_BASE } from '../espn.const';

export class EspnEndpointBuilder {
  private static fantasyBaseV3 = FANTASY_BASE_V3;
  private static fantasyBaseV2 = FANTASY_BASE_V2;
  private static oneFeedBase = ONE_FEED_BASE;
  private static commonV3 = COMMON_V3;

  private _leagueId: string | undefined;
  private _sport: FantasySports | undefined;
  private _year: string;

  constructor(sport?: FantasySports, leagueId?: string, year = new Date().getFullYear().toString()) {
    this._leagueId = leagueId;
    this._sport = sport;
    this._year = year;
  }

  get fantasyPlayerNews(): string {
    return `${this.fantasyBaseV2WithFragments}/news/players`;
  }

  get espnEvents(): string {
    return `${this.fantasyBaseV2WithFragments}/games`;
  }

  get fantasyPlayerTransaction(): string {
    return `${this.fantasyLeague}/transactions`;
  }

  get fantasyLeague(): string {
    return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${this._leagueId}`;
  }

  get positions(): string {
    return `${EspnEndpointBuilder.commonV3}/${this._sport}/mlb/positions`;
  }

  get oneFeed(): string {
    return `${EspnEndpointBuilder.oneFeedBase}/oneFeed`;
  }

  private get fantasyBaseV3WithFragments(): string {
    return `${EspnEndpointBuilder.fantasyBaseV3}/games/${this._sport}/seasons/${this._year}`;
  }

  private get fantasyBaseV2WithFragments(): string {
    return `${EspnEndpointBuilder.fantasyBaseV2}/games/${this._sport}`;
  }
}

export enum SportLeague {
  MLB = 'mlb',
  NFL = 'nfl',
  NHL = 'nhl',
  NBA = 'nba',
}

export enum Sports {
  baseball = 'baseball',
  tennis = 'tennis',
  mma = 'mma',
  golf = 'golf',
  hockey = 'hockey',
  baseketball = 'basketball',
  soccer = 'soccer',
}

export enum FantasySports {
  Baseball = 'flb',
  Football = 'ffl',
  Basketball = 'fba',
  Hockey = 'fhl',
}

export enum EspnParamFragment {
  ScoringPeriod = 'scoringPeriodId',
  View = 'view',
  UseMap = 'useMap',
  Dates = 'dates',
  Days = 'days',
  PlayerId = 'playerId',
  PbpOnly = 'pbpOnly',
}

export enum EspnViewParamFragment {
  Settings = 'mSettings',
  PlayerInfo = 'kona_player_info',
  LiveScoring = 'mLiveScoring',
  MatchupScore = 'mMatchupScore',
  Roster = 'mRoster',
  Scoreboard = 'mScoreboard',
  Team = 'mTeam',
  PendingTransactions = 'mPendingTransactions',
}

export const espnViewParamFragmentList = enumAsList(EspnViewParamFragment);

// type AllPropsString<T> = { [key in T]: string };

export const FantasySportToLabelMap: { [key in FantasySports]: string } = {
  [FantasySports.Baseball]: 'Baseball',
  [FantasySports.Football]: 'Football',
  [FantasySports.Hockey]: 'Hockey',
  [FantasySports.Basketball]: 'Basketball',
};

export const FantasySportToSportLeagueMap: { [key in FantasySports]: SportLeague } = {
  [FantasySports.Baseball]: SportLeague.MLB,
  [FantasySports.Football]: SportLeague.NFL,
  [FantasySports.Hockey]: SportLeague.NHL,
  [FantasySports.Basketball]: SportLeague.NBA,
};

export const LeagueSportToImageLocationMap: { [key in FantasySports]: string } = {
  [FantasySports.Baseball]: '-4px -272px',
  [FantasySports.Basketball]: '-4px -239px',
  [FantasySports.Football]: '-4px -206px',
  [FantasySports.Hockey]: '-4px -304px',
};
