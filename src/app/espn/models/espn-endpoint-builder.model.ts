import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { FANTASY_BASE_V2, FANTASY_BASE_V3, ONE_FEED_BASE } from '../espn.const';

export class EspnEndpointBuilder {
  private static fantasyBaseV3 = FANTASY_BASE_V3;
  private static fantasyBaseV2 = FANTASY_BASE_V2;
  private static oneFeedBase = ONE_FEED_BASE;

  private static year = new Date().getFullYear();

  private _leagueId: number;
  private _sport: FantasySports;

  constructor(sport?: FantasySports, leagueId?: number) {
    this._leagueId = leagueId;
    this._sport = sport;
  }

  get fantasyPlayerNews() {
    return `${this.fantasyBaseV2WithFragments}/news/players`;
  }

  get espnEvents() {
    return `${this.fantasyBaseV2WithFragments}/games`;
  }

  get fantasyPlayerTransaction() {
    return `${this.fantasyLeague}/transactions`;
  }

  get fantasyLeague() {
    return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${this._leagueId}`;
  }

  get oneFeed() {
    return `${EspnEndpointBuilder.oneFeedBase}/oneFeed`;
  }

  private get fantasyBaseV3WithFragments() {
    return `${EspnEndpointBuilder.fantasyBaseV3}/games/${this._sport}/seasons/${EspnEndpointBuilder.year}`;
  }

  private get fantasyBaseV2WithFragments() {
    return `${EspnEndpointBuilder.fantasyBaseV2}/games/${this._sport}`;
  }
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
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

export enum EspnParamFragment {
  ScoringPeriod = 'scoringPeriodId',
  View = 'view',
  UseMap = 'useMap',
  Dates = 'dates',
  Days = 'days',
  PlayerId = 'playerId',
}

export enum EspnViewParamFragment {
  PlayerInfo = 'kona_player_info',
  LiveScoring = 'mLiveScoring',
  MatchupScore = 'mMatchupScore',
  Roster = 'mRoster',
  Scoreboard = 'mScoreboard',
  Team = 'mTeam',
}

export const espnViewParamFragmentList = enumAsList(EspnViewParamFragment);
