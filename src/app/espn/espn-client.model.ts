export enum GameStatusId {
  Scheduled = 1,
  '2nd' = 2,
  Cancelled = 5,
  EndOfPeriod = 22,
  FirstHalf = 25,
  Halftime = 23,
  FullTime = 28,
}

enum GameStatus {
  Scheduled = 'STATUS_SCHEDULED',
  FirstHalf = 'STATUS_FIRST_HALF',
  Halftime = 'STATUS_HALFTIME',
  SecondHalf = 'STATUS_SECOND_HALF',
  InProgress = 'STATUS_IN_PROGRESS',
  InProgressAlt = 'STATUS_IN_PROGRESS_2',
  RainDelay = 'STATUS_RAIN_DELAY',
  Postponed = 'STATUS_POSTPONED',
  Canceled = 'STATUS_CANCELED',
  Delayed = 'STATUS_DELAYED',
  EndOfPeriod = 'STATUS_END_PERIOD',
  FullTime = 'STATUS_FULL_TIME',
  Final = 'STATUS_FINAL',
  FinalPenalties = 'STATUS_FINAL_PEN',
  PreFight = 'STATUS_PRE_FIGHT',
  FightersIntro = 'STATUS_FIGHTERS_INTRODUCTION',
  FightersWalking = 'STATUS_FIGHTERS_WALKING',
  EndOfFight = 'STATUS_END_OF_FIGHT',
  EndOfRound = 'STATUS_END_OF_ROUND',
  TBD = 'STATUS_TBD',
  Uncontested = 'STATUS_UNCONTESTED',
  Abandoned = 'STATUS_ABANDONED',
  Forfeit = 'STATUS_FORFEIT',
}

export enum FastCastGameStatus {
  Post = 'post',
  Pre = 'pre',
  InProgress = 'in',
}

export enum EspnSport {
  Baseball = '1',
  Football = '20',
  Soccer = '600',
  Basketball = '40',
  Hockey = '70',
}

export interface EspnClientLeague {
  id: number;
  schedule: EspnClientScheduleEntity[];
  scoringPeriodId: number;
  seasonId: number;
  settings: { name: string };
  teams: EspnClientTeam[];
  players: EspnClientFreeAgent[];
}

export interface EspnClientScheduleProperties {
  id: number;
  matchupPeriodId: number;
  home: EspnClientScheduleTeam;
  away: EspnClientScheduleTeam;
  winner: string;
  teams?: EspnClientScheduleTeam[];
}

export type EspnClientScheduleEntity = EspnClientScheduleProperties;

export interface EspnClientTeamProperties {
  id: number;
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
  rosterForCurrentScoringPeriod: EspnClientRoster;
  abbrev: string;
  location: string;
  nickname: string;
  roster: EspnClientRoster;
  points: number;
  logo: string;
  playoffSeed: number;
  draftDayProjectedRank: number;
  currentProjectedRank: number;
  rankCalculatedFinal: number;
  pointsByStat: Record<number, number>;
  valuesByStat: Record<number, number>;
  record: EspnClientTeamRecordEntity;
}

export type EspnClientTeam = Omit<EspnClientTeamProperties, 'teamId' | 'totalPoints' | 'totalPointsLive' | 'rosterForCurrentScoringPeriod'>;
export type EspnClientScheduleTeam = Pick<
  EspnClientTeamProperties,
  'teamId' | 'totalPoints' | 'totalPointsLive' | 'rosterForCurrentScoringPeriod'
>;

type EspnClientTeamRecordEntityProps = 'away' | 'division' | 'home' | 'overall';
export type EspnClientTeamRecordEntity = { [prop in EspnClientTeamRecordEntityProps]: RecordEntity };

type RecordEntityProps = 'gamesBack' | 'losses' | 'percentage' | 'pointsAgainst' | 'pointsFor' | 'streakLength' | 'ties' | 'wins';

export type RecordEntity = { [prop in RecordEntityProps]: number } & {
  streakType: string;
};

export interface EspnClientRoster {
  entries: EspnClientPlayer[];
}

export interface EspnClientPlayer {
  playerId: number;
  lineupSlotId: number;
  playerPoolEntry: EspnClientPlayerEntry;
}

export type EspnClientFreeAgent = EspnClientFreeAgentEntry;

export type EspnClientFreeAgentEntry = {
  id: number;
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
};

export interface EspnClientPlayerEntry {
  id: number;
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
}

export interface EspnClientPlayerInfo {
  fullName: string | null;
  playerId: number | null;
  lastNewsDate: number;
  defaultPositionId: number;
  proTeamId: number;
  injured: boolean;
  injuryStatus: string;
  ownership: EspnClientPlayerOwnership;
  eligibleSlots: number[];
  stats: EspnClientPlayerStatsYear[];
  starterStatusByProGame: EspnClientGameStatus;
}

export type EspnClientGameStatus = Record<number, string>;

type EspnClientPlayerOwnershipProps = 'averageDraftPosition' | 'percentChange' | 'percentOwned' | 'percentStarted';
export type EspnClientPlayerOwnership = { [prop in EspnClientPlayerOwnershipProps]: number };

type EspnClientPlayerRatingsProps = 'positionalRanking' | 'totalRanking' | 'totalRating';
export type EspnClientPlayerRatingsEntity = { [prop in EspnClientPlayerRatingsProps]: number };

export type EspnClientPlayerRatings = Record<number, EspnClientPlayerRatingsEntity>;

export interface EspnClientPlayerStatsYear {
  seasonId: number;
  statSplitTypeId: number;
  scoringPeriodId: number;
  id: string;
  stats: EspnClientPlayerStatsEntity;
}

export type EspnClientPlayerStatsEntity = Record<number, number>;
export type EspnClientPlayerStatsEntityMap = Record<string, EspnClientPlayerStatsEntity>;

export interface EspnClientPlayerNews {
  timestamp: string;
  resultsOffset: number;
  status: string;
  resultsLimit: number;
  resultsCount: number;
  feed: EspnClientPlayerNewsFeedEntity[] | null;
}

export interface EspnClientPlayerNewsFeedEntity {
  lastModified: string;
  headline: string;
  story: string;
}

export interface EspnClientEventList {
  events: EspnClientEvent[];
}

export interface EspnClientEvent {
  id: string;
  date: string;
  summary: string;
  percentComplete: number;
  competitors: EspnClientCompetitor[];
  fullStatus: EspnClientFullEventStatus;
}

export interface EspnClientFullEventStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: EspnClientEventStatusType;
  halfInning: number;
  periodPrefix: string;
}

export interface EspnClientEventStatusType {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

export interface EspnClientCompetitor {
  id: string;
  homeAway: string;
  score: number | string;
  record: string;
  abbreviation: string;
  winner: boolean;
  name: string;
}

export interface EspnClientError {
  messages: string[] | null;
  details: EspnClientErrorDetails[] | null;
}

export interface EspnClientErrorDetails {
  message: string;
  shortMessage: string;
  resolution?: null;
  type: string;
  metaData?: null;
}
