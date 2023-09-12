import {
  ESPN_PARAM_FRAGMENTS,
  ESPN_PATH_FRAGMENTS,
  ESPN_VIEW_PARAM_FRAGMENTS,
  FANTASY_SPORTS_ABBREVIATION,
  SPORTS,
  SPORT_LEAGUE,
} from './base-espn-endpoints-builder.const';

export type SportLeague = typeof SPORT_LEAGUE[keyof typeof SPORT_LEAGUE];
export type Sports = typeof SPORTS[keyof typeof SPORTS];
export type FantasySportsAbbreviation = typeof FANTASY_SPORTS_ABBREVIATION[keyof typeof FANTASY_SPORTS_ABBREVIATION];
export type EspnPathFragments = typeof ESPN_PATH_FRAGMENTS[keyof typeof ESPN_PATH_FRAGMENTS];
export type EspnParamFragments = typeof ESPN_PARAM_FRAGMENTS[keyof typeof ESPN_PARAM_FRAGMENTS];
export type EspnViewParamFragments = typeof ESPN_VIEW_PARAM_FRAGMENTS[keyof typeof ESPN_VIEW_PARAM_FRAGMENTS];

export const ESPN_VIEW_PARAM_FRAGMENTS_LIST = Object.values(ESPN_VIEW_PARAM_FRAGMENTS);

export const FantasySportToLabelMap: { [key in FantasySportsAbbreviation]: string } = {
  [FANTASY_SPORTS_ABBREVIATION.Baseball]: 'Baseball',
  [FANTASY_SPORTS_ABBREVIATION.Football]: 'Football',
  [FANTASY_SPORTS_ABBREVIATION.Hockey]: 'Hockey',
  [FANTASY_SPORTS_ABBREVIATION.Basketball]: 'Basketball',
} as const;

export const FantasySportToSportLeagueMap: { [key in FantasySportsAbbreviation]: SportLeague } = {
  [FANTASY_SPORTS_ABBREVIATION.Baseball]: SPORT_LEAGUE.MLB,
  [FANTASY_SPORTS_ABBREVIATION.Football]: SPORT_LEAGUE.NFL,
  [FANTASY_SPORTS_ABBREVIATION.Hockey]: SPORT_LEAGUE.NHL,
  [FANTASY_SPORTS_ABBREVIATION.Basketball]: SPORT_LEAGUE.NBA,
} as const;

export const FantasySportToSportsMap: { [key in FantasySportsAbbreviation]: Sports } = {
  [FANTASY_SPORTS_ABBREVIATION.Baseball]: SPORTS.baseball,
  [FANTASY_SPORTS_ABBREVIATION.Football]: SPORTS.football,
  [FANTASY_SPORTS_ABBREVIATION.Hockey]: SPORTS.hockey,
  [FANTASY_SPORTS_ABBREVIATION.Basketball]: SPORTS.baseketball,
} as const;

export const LeagueSportToImageLocationMap: { [key in FantasySportsAbbreviation]: string } = {
  [FANTASY_SPORTS_ABBREVIATION.Baseball]: '-4px -272px',
  [FANTASY_SPORTS_ABBREVIATION.Basketball]: '-4px -239px',
  [FANTASY_SPORTS_ABBREVIATION.Football]: '-4px -206px',
  [FANTASY_SPORTS_ABBREVIATION.Hockey]: '-4px -304px',
} as const;

export const SportLeagueToImageLocationMap: { [key in SportLeague]: string } = {
  [SPORT_LEAGUE.MLB]: '-4px -272px',
  [SPORT_LEAGUE.NBA]: '-4px -239px',
  [SPORT_LEAGUE.NFL]: '-4px -206px',
  [SPORT_LEAGUE.NHL]: '-4px -304px',
} as const;

export type BaseEspnEndpointBuilderClass = {
  new (...args: unknown[]): unknown;
  fantasyPlayerNews: string;
  espnEvents: string;
  fantasyPlayerTransaction: string;
  fantasyLeagueComms: string;
  fantasyLeague: string;
  positions: string;
  oneFeed: string;
  staticScoreboard: string;
  baseballStatsBatterVsPitcher: string;
  fantasyBaseV3WithFragments: string;
  leagueClickout: string;
  matchupClickout: (teamId: string | number, matchupPeriodId: string | number) => string;
};
