export type EntityBaseProperties = 'id' | 'uid' | 'name';

export interface EspnClientFastcast {
  sports: SportsEntity[];
}
export type SportsEntity = { [prop in EntityBaseProperties]: string } & {
  slug: string;
  leagues: LeaguesEntity[];
};

export type LeaguesEntity = { [prop in EntityBaseProperties]: string } & {
  slug: string;
  abbreviation: string;
  shortName: string;
  isTournament: boolean;
  events?: EventsEntity[];
};

export type EventsEntity = { [prop in EntityBaseProperties]: string } & {
  competitionId: string;
  date: string;
  shortName: string;
  location: string;
  season: number;
  seasonType: string;
  period: number;
  clock: string;
  status: string;
  summary: string;
  fullStatus: FullStatus;
  link: string;
  seriesSummary?: string | null;
  competitors?: CompetitorsEntity[] | null;
  situation?: Situation | null;
  week?: number | null;
  weekText?: string | null;
  note?: string | null;
  notes?: NotesEntity[] | null;
};

export interface Group {
  groupId: string;
  name: string;
  abbreviation: string;
  shortName: string;
}
export type FullStatus = { type: FullStatusType };
export type FullStatusType = { id: string; state: string; completed: boolean };

export interface TeamProperties {
  id: string;
  abbreviation: string;
}

export interface CompetitorsEntity {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  score: string;
  aggregateScore?: number;
  record: string | RecordEntity[];
  logo: string;
  logoDark: string;
  winner: boolean;
  displayName: string;
  name: string;
  abbreviation: string;
  location: string;
  color: string;
  alternateColor?: string | null;
  group: string;
  competitionIdPrevious: string;
  competitionIdNext?: string | null;
  rank?: number | null;
  leaders?: Leaders[] | null;
  goalieSummary?: GoalieSummaryEntity[] | null;
  shortenedRecord?: string | null;
  scoringSummary?: ScoringEntity[] | null;
  advance?: boolean | null;
  form?: string | null;
  isNational?: boolean | null;
  uniform?: Uniform | null;
}

export interface RecordEntity {
  type: string;
  summary: string;
  displayValue: string;
}

export interface Leaders {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders?: Leader[] | null;
}

export interface Leader {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: TeamProperties;
}
export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  headshot: string;
  jersey: string;
  position: Position;
  team: TeamProperties;
  lastName?: string | null;
  active: boolean;
}
export interface Position {
  abbreviation: string;
}

export interface GoalieSummaryEntity {
  athlete: Athlete;
  displayValue: string;
}

export interface ScoringEntity {
  athlete: Athlete;
  displayValue: string;
}

export interface Uniform {
  type: string;
  color: string;
  alternateColor?: string | null;
}

export interface Situation {
  lastPlay: LastPlay | null;
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
  batter: MlbSituationAthlete;
  pitcher: MlbSituationAthlete;
}

export interface MlbSituationAthlete {
  playerId: number;
  summary: string;
  athlete: Athlete;
}

export type NflSituation = Situation & {
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
};

export interface LastPlay {
  id: string;
  type: LastPlayType;
  text: string;
  scoreValue: number;
  team?: Pick<TeamProperties, 'id'> | null;
  athletesInvolved?: AthletesInvolvedEntity[] | null;
}

export interface LastPlayType {
  id: string;
  text: string;
  abbreviation?: string | null;
}

export interface AthletesInvolvedEntity {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  headshot: string;
  jersey: string;
  position: string;
  team: Pick<TeamProperties, 'id'>;
}

export interface NotesEntity {
  type: string;
  headline?: string | null;
  text: string;
  date?: string | null;
  source?: string | null;
}
