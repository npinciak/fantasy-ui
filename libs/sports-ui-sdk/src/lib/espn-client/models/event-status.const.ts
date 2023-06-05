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

export const EVENT_STATUS_TYPE = {
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
