export class UrlBuilder {
  static get baseUrl() {
    return UrlPathFragments.Empty;
  }

  static get espnBaseUrl() {
    return UrlPathFragments.Espn;
  }

  static get dfsBase() {
    return UrlPathFragments.Dfs;
  }

  static dfsSlates(sport: UrlPathFragments, site: string) {
    return [UrlBuilder.dfsBase];
  }

  static get dfsMlbBase() {
    return `${UrlPathFragments.Dfs}/${UrlPathFragments.MLB}`;
  }

  static get dfsNflBase() {
    return `${UrlPathFragments.Dfs}/${UrlPathFragments.NFL}`;
  }

  static get espnMlbBase() {
    return `${UrlBuilder.espnBaseUrl}/${UrlPathFragments.MLB}`;
  }

  static get espnNflBase() {
    return `${UrlBuilder.espnBaseUrl}/${UrlPathFragments.NFL}`;
  }

  public static espnLeague(sport: UrlPathFragments, leagueId: string | null) {
    return [UrlBuilder.espnBaseUrl, sport, leagueId];
  }

  public static espnFreeAgents(sport: UrlPathFragments, leagueId: string | null) {
    return [UrlBuilder.espnBaseUrl, sport, leagueId, UrlPathFragments.FreeAgents];
  }

  public static espnNflTeam(sport: UrlPathFragments, leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnBaseUrl, sport, leagueId, UrlPathFragments.Team, teamId];
  }

  public static espnMlbLeague(leagueId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId];
  }

  public static espnMlbLeagueFreeAgents(leagueId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId, UrlPathFragments.FreeAgents];
  }

  public static espnMlbLeagueTeam(leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId, UrlPathFragments.Team, teamId];
  }

  public static espnNflLeague(leagueId: string | null) {
    return [UrlBuilder.espnNflBase, leagueId];
  }

  public static espnNflLeagueTeam(leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnNflBase, leagueId, UrlPathFragments.Team, teamId];
  }
}

export enum UrlPathFragments {
  Dfs = 'daily-fantasy',
  Empty = '',
  Espn = 'espn',
  Game = 'game',
  League = 'league',
  MLB = 'mlb',
  NFL = 'nfl',
  NBA = 'nba',
  Team = 'team',
  FreeAgents = 'free-agents',
  MyProfile = 'my-profile',
  Year = 'year',
  Batters = 'batters',
  Pitchers = 'pitchers',
}

export enum UrlPathParams {
  Year = ':year',
  GameId = ':gameId',
  LeagueId = ':leagueId',
  Sport = ':sport',
  TeamId = ':teamId',
}

export enum UrlQueryParams {
  Site = 'site',
  Sport = 'sport',
  Slate = 'slate',
}

export const SportToUrlFragmentSportMap = {
  ffl: UrlPathFragments.NFL,
  flb: UrlPathFragments.MLB,
};
