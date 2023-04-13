export interface BaseResponse {
  license: string;
  statusCode: number;
  content: Content;
}

export interface Content {
  sport: string;
  league: string;
  season: string;
  season_url: string;
  upcoming: Upcoming;
  future: Future;
}

export interface Upcoming {
  spread?: SpreadEntity[] | null;
  over?: OverEntity[] | null;
  under?: UnderEntity[] | null;
  home_win?: HomeWinEntity[] | null;
  away_win?: AwayWinEntity[] | null;
}

type BaseEntity = {
  team: string;
  abbr: string;
  conference: string;
  division: string;
  icon: string;
  value_description: string;
  value_type: string;
  rank: string;
};

export type SpreadEntity = BaseEntity & {
  cover_per: string;
  spread_record: string;
};

export type OverEntity = BaseEntity & {
  over_per: string;
  ou_record: string;
};

export type UnderEntity = BaseEntity & {
  under_per: string;
  ou_record: string;
};

export type HomeWinEntity = BaseEntity & {
  win_per: string;
  home_record: string;
};

export type AwayWinEntity = BaseEntity & {
  win_per: string;
  away_record: string;
};

export interface Future {
  standings: Standings;
  player_standings?: PlayerStandingsEntity[] | null;
}

export interface Standings {
  division?: DivisionEntity[] | null;
  conference?: ConferenceEntity[] | null;
  league?: LeagueEntity[] | null;
}

export interface DivisionEntity {
  conference_name: string;
  divisions?: DivisionsEntity[] | null;
}

export interface DivisionsEntity {
  division_name: string;
  standing?: StandingEntity[] | null;
}

export type StandingEntity = BaseEntity & {
  division_record: string;
  win_per: string;
  league_record: string;
  last_five_games_record: string;
};

export interface ConferenceEntity {
  conference_name: string;
  standing?: StandingEntity1[] | null;
}

export type StandingEntity1 = BaseEntity & {
  conference_record: string;
  win_per: string;
  league_record: string;
  last_five_games_record: string;
};

export type LeagueEntity = BaseEntity & {
  win_per: string;
  league_record: string;
  last_five_games_record: string;
};

export interface PlayerStandingsEntity {
  standing_type: string;
  standings?: StandingsEntity[] | null;
}

export type StandingsEntity = Omit<BaseEntity, 'rank'> & {
  attempts: number;
  attempts_description: string;
  average: string;
};
