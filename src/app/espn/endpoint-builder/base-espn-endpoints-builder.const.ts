export const SPORT_LEAGUE = {
  MLB: 'mlb',
  NFL: 'nfl',
  NHL: 'nhl',
  NBA: 'nba',
} as const;

export const SPORTS = {
  baseball: 'baseball',
  tennis: 'tennis',
  mma: 'mma',
  golf: 'golf',
  hockey: 'hockey',
  baseketball: 'basketball',
  soccer: 'soccer',
} as const;

export const FANTASY_SPORTS_ABBREVIATION = {
  Baseball: 'flb',
  Football: 'ffl',
  Basketball: 'fba',
  Hockey: 'fhl',
} as const;

export const ESPN_PATH_FRAGMENTS = {
  Stats: 'stats',
  BatterVsPitcher: 'bvp',
} as const;

export const ESPN_PARAM_FRAGMENTS = {
  ScoringPeriod: 'scoringPeriodId',
  View: 'view',
  UseMap: 'useMap',
  Dates: 'dates',
  Date: 'date',
  Days: 'days',
  PlayerId: 'playerId',
  PbpOnly: 'pbpOnly',
  BatterId: 'batterId',
} as const;

export const ESPN_VIEW_PARAM_FRAGMENTS = {
  Settings: 'mSettings',
  PlayerInfo: 'kona_player_info',
  PlayerCard: 'kona_playercard',
  LiveScoring: 'mLiveScoring',
  MatchupScore: 'mMatchupScore',
  Roster: 'mRoster',
  Scoreboard: 'mScoreboard',
  Team: 'mTeam',
  Transactions: 'mTransactions2',
  PendingTransactions: 'mPendingTransactions',
  Comms: 'kona_league_communication',
  ProTeamSchedules: 'proTeamSchedules_wl',
} as const;
