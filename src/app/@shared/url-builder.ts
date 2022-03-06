export class UrlBuilder {
  static get baseUrl() {
    return UrlFragments.Empty;
  }

  static get espnBaseUrl() {
    return UrlFragments.Espn;
  }

  static get dfsBase() {
    return `${UrlFragments.Dfs}`;
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

  public static espnMlbLeague(leagueId: string) {
    return `${UrlBuilder.espnMlbBase}/${leagueId}`;
  }

  public static espnMlbLeagueTeam(leagueId: string, teamId: string) {
    return `${UrlBuilder.espnMlbBase}/${leagueId}/${UrlFragments.Team}/${teamId}`;
  }

  public static espnNflLeague(leagueId: string) {
    return `${UrlBuilder.espnNflBase}/${leagueId}`;
  }
}

export enum UrlFragments {
  Dfs = 'daily-fantasy',
  Empty = '',
  Espn = 'espn',
  MLB = 'mlb',
  NFL = 'nfl',
  Team = 'team',
  FreeAgents = 'free-agents',
}

export enum UrlParams {
  LeagueId = ':leagueId',
  Sport = ':sport',
  TeamId = ':teamId',
}

export enum UrlQueryParams {
  Site = 'site',
  Sport = 'sport',
  Slate = 'slate',
}
