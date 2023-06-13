export const LEAGUE_COMMUNICATION_TOPIC = {
  Transactions: 'ACTIVITY_TRANSACTIONS',
  Settings: 'ACTIVITY_SETTINGS',
} as const;

export const SPORT_ID = {
  Baseball: '1',
  Football: '20',
  Soccer: '600',
  Basketball: '40',
  Hockey: '70',
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
