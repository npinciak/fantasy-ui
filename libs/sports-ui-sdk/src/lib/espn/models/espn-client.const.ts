export const EVENT_STATUS = {
  Postgame: 'post',
  Pre: 'pre',
  InProgress: 'in',
} as const;

export const EVENT_STATUS_NAME = {
  Scheduled: 'STATUS_SCHEDULED',
  FirstHalf: 'STATUS_FIRST_HALF',
  Halftime: 'STATUS_HALFTIME',
  SecondHalf: 'STATUS_SECOND_HALF',
  InProgress: 'STATUS_IN_PROGRESS',
  InProgressAlt: 'STATUS_IN_PROGRESS_2',
  RainDelay: 'STATUS_RAIN_DELAY',
  Postponed: 'STATUS_POSTPONED',
  Canceled: 'STATUS_CANCELED',
  Delayed: 'STATUS_DELAYED',
  EndOfPeriod: 'STATUS_END_PERIOD',
  FullTime: 'STATUS_FULL_TIME',
  Final: 'STATUS_FINAL',
  FinalPenalties: 'STATUS_FINAL_PEN',
  PreFight: 'STATUS_PRE_FIGHT',
  FightersIntro: 'STATUS_FIGHTERS_INTRODUCTION',
  FightersWalking: 'STATUS_FIGHTERS_WALKING',
  EndOfFight: 'STATUS_END_OF_FIGHT',
  EndOfRound: 'STATUS_END_OF_ROUND',
  TBD: 'STATUS_TBD',
  Uncontested: 'STATUS_UNCONTESTED',
  Abandoned: 'STATUS_ABANDONED',
  Forfeit: 'STATUS_FORFEIT',
} as const;

export const LEAGUE_COMMUNICATION_TOPIC = {
  Transactions: 'ACTIVITY_TRANSACTIONS',
  Settings: 'ACTIVITY_SETTINGS',
} as const;

export const EVENT_STATUS_ID = {
  Scheduled: '1',
  InProgress: '2',
  Final: '3',
  Cancelled: '5',
  Delayed: '7',
  EndOfPeriod: '22',
  FirstHalf: '25',
  Halftime: '23',
  FullTime: '28',
} as const;

export const SPORT_ID = {
  Baseball: '1',
  Football: '20',
  Soccer: '600',
  Basketball: '40',
  Hockey: '70',
} as const;

export const PLAYER_INJURY_STATUS = {
  Active: 'ACTIVE',
  Probable: 'PROBABLE',
  Ques: 'QUESTIONABLE',
  NotStarting: 'NOTSTARTING',
  Starting: 'STARTING',
  D: 'DOUBTFUL',
  O: 'OUT',
  IR: 'INJURY_RESERVE',
  DTD: 'DAY_TO_DAY',
  DL7: 'SEVEN_DAY_DL',
  DL10: 'TEN_DAY_DL',
  DL15: 'FIFTEEN_DAY_DL',
  DL60: 'SIXTY_DAY_DL',
  Brv: 'BEREAVEMENT',
  Pat: 'PATERNITY',
  SUS: 'SUSPENSION',
} as const;

export const PLAYER_AVAILABILITY_STATUS = {
  FreeAgent: 'FREEAGENT',
  Waivers: 'WAIVERS',
  OnTeam: 'ONTEAM',
} as const;

export const SCHEDULE_WINNER = {
  HOME: 'HOME',
  AWAY: 'AWAY',
  UNDECIDED: 'UNDECIDED',
} as const;

export const TRANSACTION = {
  Add: 'ADD',
  Drop: 'DROP',
  Waiver: 'WAIVER',
  Lineup: 'LINEUP',
  Roster: 'ROSTER',
} as const;

export const SEASON_ID = {
  Preseason: '1',
  Regular: '2',
  Postseason: '3',
} as const;

export const ARTICLE_TYPE = {
  Default: 'Default',
  Rotowire: 'Rotowire',
  Story: 'Story',
} as const;
