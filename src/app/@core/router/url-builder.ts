export enum UrlPathFragments {
  Dfs = 'daily-fantasy',
  Empty = '',
  Espn = 'espn',
  Game = 'game',
  League = 'league',
  MLB = 'mlb',
  /**
   * @deprecated Use UrlPathFragments.Football instead
   */
  NFL = 'nfl',
  Football = 'football',
  NBA = 'nba',
  Team = 'team',
  FreeAgents = 'free-agents',
  MyProfile = 'my-profile',
  Year = 'year',
  Batters = 'batters',
  Pitchers = 'pitchers',
  Player = 'player',
  SystemStatus = 'system-status',
}

export enum UrlPathParams {
  Year = ':year',
  GameId = ':gameId',
  LeagueId = ':leagueId',
  Sport = ':sport',
  TeamId = ':teamId',
  PlayerId = ':playerId',
}

export enum UrlQueryParams {
  Site = 'site',
  Sport = 'sport',
  Slate = 'slate',
}

export const SportToUrlFragmentSportMap = {
  ffl: UrlPathFragments.Football,
  flb: UrlPathFragments.MLB,
};
