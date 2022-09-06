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

export enum EspnFreeAgentAvailabilityStatus {
  FreeAgent = 'FREEAGENT',
  Waivers = 'WAIVERS',
  OnTeam = 'ONTEAM',
}

interface EspnClientLineupProps {
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

export type EspnClientLineupEntity = EspnClientLineupProps;
export type EspnClientLineupEntityMap = Record<number, EspnClientLineupEntity>;

export interface EspnClientLeague {
  id: number;
  schedule: EspnClientScheduleEntity[];
  scoringPeriodId: number;
  seasonId: number;
  status: EspnClientLeagueStatus;
  settings: EspnClientLeagueSettings;
  teams: EspnClientTeam[];
  players: EspnClientFreeAgent[];
}

type StatusProps = 'firstScoringPeriod' | 'finalScoringPeriod';
export type EspnClientLeagueStatus = { [key in StatusProps]: number };

export interface EspnClientLeagueSettings {
  name: string;
  rosterSettings: EspnClientLeagueRosterSettings;
  scheduleSettings: EspnClientScheduleSettings;
}

export type EspnClientScheduleSettings = { matchupPeriodCount: number };

type RosterSettingsProps = 'positionLimits' | 'lineupSlotCounts';
export type EspnClientLeagueRosterSettings = { [key in RosterSettingsProps]: Record<string, number> };

export interface EspnClientScheduleProps {
  id: number;
  matchupPeriodId: number;
  home: EspnClientScheduleTeam;
  away: EspnClientScheduleTeam;
  winner: string;
  teams?: EspnClientScheduleTeam[];
}

export type EspnClientBaseballLeague = Omit<EspnClientLeague, 'teams'> & {
  teams: EspnClientBaseballTeam[];
};

export type EspnClientFootballLeague = Omit<EspnClientLeague, 'teams'> & {
  teams: EspnClientFootballTeam[];
};

export type EspnClientScheduleEntity = EspnClientScheduleProps;

export interface EspnClientTeamProps {
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
  record: string;
}

export type EspnClientTeam = Omit<EspnClientTeamProps, 'teamId' | 'totalPoints' | 'totalPointsLive' | 'rosterForCurrentScoringPeriod'>;
export type EspnClientBaseballTeam = EspnClientTeam;
export type EspnClientFootballTeam = Omit<EspnClientTeam, 'record'> & { record: EspnClientTeamRecordEntity };

export type EspnClientScheduleTeam = Pick<
  EspnClientTeamProps,
  'teamId' | 'totalPoints' | 'totalPointsLive' | 'rosterForCurrentScoringPeriod'
> & {
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

export type EspnClientFreeAgentEntry = {
  id: number;
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
};

export interface EspnClientPlayerEntry {
  id: number;
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
  appliedStatTotal: number;
}

export interface EspnClientPlayerInfo {
  fullName: string;
  playerId: number;
  lastNewsDate: number;
  defaultPositionId: number;
  proTeamId: number;
  injured: boolean;
  injuryStatus: EspnPlayerInjuryStatus;
  ownership: EspnClientPlayerOwnership;
  eligibleSlots: number[];
  stats?: EspnClientPlayerStatsYear[];
  starterStatusByProGame: EspnClientGameStatus;
}

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
  filterSlotIds?: FilterValueNumber;
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

export interface FilterValueString {
  value: string[];
}

export interface FilterValueNumber {
  value: number[];
}

export interface FilterStatsForTopScoringPeriodIds {
  value: number;
  additionalValue: string[];
}
