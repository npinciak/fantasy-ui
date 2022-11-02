export class UrlBuilder {
  static get baseUrl() {
    return UrlFragments.Empty;
  }

  static get espnBaseUrl() {
    return UrlFragments.Espn;
  }

  static get dfsBase() {
    return UrlFragments.Dfs;
  }

  static dfsSlates(sport: UrlFragments, site: string) {
    return [UrlBuilder.dfsBase];
  }

  static get dfsMlbBase() {
    return `${UrlFragments.Dfs}/${UrlFragments.MLB}`;
  }

  static get dfsNflBase() {
    return `${UrlFragments.Dfs}/${UrlFragments.NFL}`;
  }

  static get espnMlbBase() {
    return `${UrlBuilder.espnBaseUrl}/${UrlFragments.MLB}`;
  }

  static get espnNflBase() {
    return `${UrlBuilder.espnBaseUrl}/${UrlFragments.NFL}`;
  }

  public static espnLeague(sport: UrlFragments, leagueId: string | null) {
    return [UrlBuilder.espnBaseUrl, sport, leagueId];
  }

  public static espnFreeAgents(sport: UrlFragments, leagueId: string | null) {
    return [UrlBuilder.espnBaseUrl, sport, leagueId, UrlFragments.FreeAgents];
  }

  public static espnTeam(sport: UrlFragments, leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnMlbBase, sport, leagueId, UrlFragments.Team, teamId];
  }

  public static espnMlbLeague(leagueId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId];
  }

  public static espnMlbLeagueFreeAgents(leagueId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId, UrlFragments.FreeAgents];
  }

  public static espnMlbLeagueTeam(leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnMlbBase, leagueId, UrlFragments.Team, teamId];
  }

  public static espnNflLeague(leagueId: string | null) {
    return [UrlBuilder.espnNflBase, leagueId];
  }

  public static espnNflLeagueTeam(leagueId: string | null, teamId: string | null) {
    return [UrlBuilder.espnNflBase, leagueId, UrlFragments.Team, teamId];
  }
}

export enum UrlFragments {
  Dfs = 'daily-fantasy',
  Empty = '',
  Espn = 'espn',
  Game = 'game',
  MLB = 'mlb',
  NFL = 'nfl',
  Team = 'team',
  FreeAgents = 'free-agents',
}

export enum UrlParams {
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
