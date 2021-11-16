export class UrlBuilder {
  get baseUrl() {
    return UrlFragments.Empty;
  }
}

export enum UrlFragments {
  Dfs = 'daily-fantasy',
  Empty = '',
  Espn = 'espn',
  MLB = 'mlb',
  NFL = 'nfl',
  Team = 'team',
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
