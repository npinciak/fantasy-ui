export enum EspnPlayerInjuryStatus {
  Active = 'ACTIVE',
  Probable = 'PROBABLE',
  Ques = 'QUESTIONABLE',
  NotStarting = 'NOTSTARTING',
  Starting = 'STARTING',
  D = 'DOUBTFUL',
  O = 'OUT',
  IR = 'INJURY_RESERVE',
  DTD = 'DAY_TO_DAY',
  DL7 = 'SEVEN_DAY_DL',
  DL10 = 'TEN_DAY_DL',
  DL15 = 'FIFTEEN_DAY_DL',
  DL60 = 'SIXTY_DAY_DL',
  Brv = 'BEREAVEMENT',
  Pat = 'PATERNITY',
  SUS = 'SUSPENSION',
}

export enum EspnGameStatusTypeId {
  Scheduled = '1',
  Second = '2',
  Cancelled = '5',
  Delayed = '7',
  EndOfPeriod = '22',
  FirstHalf = '25',
  Halftime = '23',
  FullTime = '28',
}

export enum EspnGameStatusName {
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

export enum FastCastSeasonType {
  Pre = '1',
  Reg = '2',
  Post = '3',
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

export enum EspnLeagueId {
  MLB = 10,
  NCAAF = 23,
  NFL = 28,
  NBA = 46,
  NHL = 90,
}

export enum EspnFreeAgentAvailabilityStatus {
  FreeAgent = 'FREEAGENT',
  Waivers = 'WAIVERS',
  OnTeam = 'ONTEAM',
}

export enum EspnClientScheduleWinner {
  HOME = 'HOME',
  AWAY = 'AWAY',
  UNDECIDED = 'UNDECIDED',
}

export enum EspnClientTransactionType {
  Add = 'ADD',
  Drop = 'DROP',
  Waiver = 'WAIVER',
  Lineup = 'LINEUP',
  Roster = 'ROSTER',
}

export enum EspnClientFootballPosition {
  POS0,
  QB,
  RB,
  WR,
  TE,
  K,
  POS6,
  P,
  POS8,
  DT,
  DE,
  LB,
  CB,
  S,
  HC,
  TQB,
  DST,
  EDR,
}

export namespace EspnClient {
  interface LineupAttributes {
    parentId: number;
    id: number;
    abbrev: string;
    bench: boolean;
    eligiblePositions: number[];
    lineupSlotEligible: boolean;
    name: string;
    starter: boolean;
    displayOrder: number;
    active: boolean;
  }

  export type LineupEntity = LineupAttributes;
  export type LineupEntityMap = Record<number, LineupEntity>;
}

export interface EspnClientLeague {
  id: number;
  schedule: EspnClientScheduleEntity[];
  scoringPeriodId: number;
  seasonId: number;
  status: EspnClientLeagueStatus;
  settings: EspnClientLeagueSettings;
  teams: EspnClientTeam[];
  players: EspnClientFreeAgent[];
  communication: EspnClientLeagueComm;
  transactions: EspnClientLeagueTransaction[];
}

export type EspnClientLeagueTransaction = {
  bidAmount: number;
  executionType: 'PROCESS' | 'CANCEL';
  id: string;
  isActingAsTeamOwner: boolean;
  isLeagueManager: boolean;
  isPending: boolean;
  items?: EspnClientLeagueTransactionItem[] | null;
  memberId: string;
  proposedDate: number;
  rating: number;
  scoringPeriodId: number;
  status: 'EXECUTED' | 'CANCELED';
  teamId: number;
  type: EspnClientTransactionType;
  relatedTransactionId?: string | null;
  processDate?: number | null;
};

type TransactionItemAttributes = 'fromLineupSlotId' | 'fromTeamId' | 'overallPickNumber' | 'playerId' | 'toLineupSlotId' | 'toTeamId';
export type EspnClientLeagueTransactionItem = { [key in TransactionItemAttributes]: number } & {
  isKeeper: boolean;
  type: EspnClientTransactionType;
};

export interface EspnClientLeagueComm {
  topics: EspnClientLeagueCommTopic[];
}

export interface EspnClientLeagueCommTopic {
  id: string;
  date: number;
  messages: EspnClientLeagueCommTopicMsg[];
  type: 'ACTIVITY_TRANSACTIONS' | 'ACTIVITY_SETTINGS';
}

export interface EspnClientLeagueCommTopicMsg {
  id: string;
  messageTypeId: number;
  targetId: number; // playerId
  to: number; // to teamId
  topicId: string;
}

type StatusAttributes = 'firstScoringPeriod' | 'finalScoringPeriod';
export type EspnClientLeagueStatus = { [key in StatusAttributes]: number };

export interface EspnClientLeagueSettings {
  name: string;
  rosterSettings: EspnClientLeagueRosterSettings;
  scheduleSettings: EspnClientScheduleSettings;
}

export type EspnClientScheduleSettings = { matchupPeriodCount: number };

type RosterSettingsAttributes = 'positionLimits' | 'lineupSlotCounts';
export type EspnClientLeagueRosterSettings = { [key in RosterSettingsAttributes]: Record<string, number> };

export interface EspnClientScheduleAttributes {
  id: number;
  matchupPeriodId: number;
  home: EspnClientScheduleTeam;
  away: EspnClientScheduleTeam;
  winner: EspnClientScheduleWinner;
  teams?: EspnClientScheduleTeam[];
}

export type EspnClientBaseballLeague = Omit<EspnClientLeague, 'teams'> & {
  teams: EspnClientBaseballTeam[];
};

export type EspnClientFootballLeague = Omit<EspnClientLeague, 'teams'> & {
  teams: EspnClientFootballTeam[];
};

export type EspnClientScheduleEntity = EspnClientScheduleAttributes;

export interface EspnClientTeamAttributes {
  id: number;
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
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
}

export type EspnClientTeam = Omit<EspnClientTeamAttributes, 'teamId' | 'totalPoints' | 'totalPointsLive' | 'rosterForCurrentScoringPeriod'>;
export type EspnClientBaseballTeam = EspnClientTeam & { record: string };
export type EspnClientFootballTeam = EspnClientTeam & { record: EspnClientTeamRecordEntity };

export type EspnClientScheduleTeam = Pick<EspnClientTeamAttributes, 'teamId' | 'totalPoints' | 'rosterForCurrentScoringPeriod'> & {
  totalProjectedPointsLive?: number;
  totalPointsLive?: number;
  cumulativeScore: EspnClientTeamCumulativeScore;
};

type CumulativeScoreProps = 'wins' | 'lossses' | 'ties';
export type EspnClientTeamCumulativeScore = { [key in CumulativeScoreProps]: number };

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
  playerPoolEntry?: EspnClientPlayerEntry;
}

export type EspnClientFreeAgent = EspnClientFreeAgentEntry;
export type EspnClientFreeAgentEntry = EspnClientPlayerEntry;

export interface EspnClientPlayerEntry {
  id: number;
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
  appliedStatTotal: number;
}

export interface EspnClientPlayerInfo {
  fullName: string;
  playerId: number;
  id: number;
  lastNewsDate: number;
  defaultPositionId: number;
  proTeamId: number;
  injured: boolean;
  injuryStatus: EspnPlayerInjuryStatus;
  ownership: EspnClientPlayerOwnership;
  outlooks?: EspnClientPlayerOutlooksMap;
  eligibleSlots: number[];
  stats?: EspnClientPlayerStatsYear[];
  starterStatusByProGame: EspnClientGameStatus;
}

export type EspnClientPlayerOutlooks = Record<string, string>;
export type EspnClientPlayerOutlooksMap = {
  outlooksByWeek?: EspnClientPlayerOutlooks;
};

export type EspnClientGameStatus = Record<number, string>;

type EspnClientPlayerOwnershipProps = 'averageDraftPosition' | 'percentChange' | 'percentOwned' | 'percentStarted';
export type EspnClientPlayerOwnership = { [prop in EspnClientPlayerOwnershipProps]: number };

type EspnClientPlayerRatingsProps = 'positionalRanking' | 'totalRanking' | 'totalRating';
export type EspnClientPlayerRatingsEntity = { [prop in EspnClientPlayerRatingsProps]: number };

export type EspnClientPlayerRatings = Record<number, EspnClientPlayerRatingsEntity>;
export type EspnClientFreeAgentPlayerInfo = Omit<EspnClientPlayerInfo, 'playerId'>;

export type EspnClientPlayerStatsYear = {
  stats: EspnClientPlayerStatsEntity;
  seasonId: number;
  statSplitTypeId: number;
  scoringPeriodId: number;
  id: string;
  appliedAverage: number | null;
  appliedTotal: number | null;
  appliedTotalCeiling: number | null;
};

export type EspnClientPlayerStatsEntity = Record<number, number>;
export type EspnClientPlayerStatsEntityMap = Record<string, EspnClientPlayerStatsEntity>;
export type EspnClientPlayerStatsByYearMap = Record<string, EspnClientPlayerStatsYear>;

export interface EspnClientPlayerNews {
  timestamp: string;
  resultsOffset: number;
  status: string;
  resultsLimit: number;
  resultsCount: number;
  feed: EspnClientPlayerNewsFeedEntity[];
}

export interface EspnClientPlayerNewsFeedEntity {
  id: number;
  lastModified: string;
  headline: string;
  story: string;
}

export interface EspnClientEventList {
  events: EspnClientEvent[];
}

export interface EspnClientEvent {
  id: string;
  uid: string;
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

export interface EspnClientPaginatedFilter {
  players: PlayerFilterEntity;
}

export interface PlayerFilterEntity {
  filterStatus: FilterValueString;
  filterSlotIds?: Partial<FilterValueNumber>;
  filterStatsForTopScoringPeriodIds?: FilterStatsForTopScoringPeriodIds;
  filterRanksForScoringPeriodIds?: FilterValueNumber;
  sortPercOwned: SortMetaData;
  sortStatId?: SortMetaData & { additionalValue: string };
  sortDraftRanks?: SortMetaData;
  limit: number;
  offset: number;
}

export interface SortMetaData {
  sortPriority: number;
  sortAsc: boolean;
  value: string | number | null;
}

export type FilterValueString = {
  value: string[];
};

export type FilterValueNumber = {
  value: number[];
};

export interface FilterStatsForTopScoringPeriodIds {
  value: number;
  additionalValue: string[];
}
