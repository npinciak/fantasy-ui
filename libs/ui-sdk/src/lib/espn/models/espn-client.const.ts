export const LEAGUE_COMMUNICATION_TOPIC = {
  Transactions: 'ACTIVITY_TRANSACTIONS',
  Settings: 'ACTIVITY_SETTINGS',
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
