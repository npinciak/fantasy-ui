﻿import { EspnGameStatusTypeId, FastCastGameStatus, FastCastSeasonType } from '@espnClient/espn-client.model';

export type EntityBaseAttributes = 'id' | 'uid' | 'name';
export type EntityBase = { [prop in EntityBaseAttributes]: string };

export interface EspnClientFastcast {
  sports: SportsEntity[];
}

export type SportsEntity = EntityBase & {
  slug: string;
  leagues: LeaguesEntity[];
};

export type LeaguesEntity = EntityBase & {
  slug: string;
  abbreviation: string;
  shortName: string;
  isTournament: boolean;
  events?: EventsEntity[];
};

export type EventsEntity = EntityBase & {
  competitionId: string;
  date: string;
  shortName: string;
  location: string;
  season: number;
  seasonType: FastCastSeasonType;
  period: number;
  clock: string;
  status: FastCastGameStatus;
  summary: string;
  fullStatus: FullStatus;
  link: string;
  odds?: EspnClientOddsEntity;
  seriesSummary?: string | null;
  competitors?: CompetitorsEntity[] | null;
  situation?: Situation | null;
  week?: number | null;
  weekText?: string | null;
  note?: string | null;
  notes?: NotesEntity[] | null;
};

export interface EspnClientOddsEntity {
  details: string;
  overUnder: number;
  spread: number;
  homeTeamOdds: EspnClientTeamOddsEntity;
  awayTeamOdds: EspnClientTeamOddsEntity;
}

export interface EspnClientTeamOddsEntity {
  favorite: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: TeamAttributes;
}

type EspnClientGroupAttributes = 'groupId' | 'name' | 'abbreviation' | 'shortName';
export type EspnClientGroup = { [key in EspnClientGroupAttributes]: string };

export type FullStatus = { type: FullStatusType };
export type FullStatusType = { id: EspnGameStatusTypeId; name: string; state: string; completed: boolean };

export type TeamAttributes = Pick<CompetitorsEntity, 'id' | 'abbreviation'>;

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
  color?: string;
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
  gamesBack: number;
  losses: number;
  percentage: number;
  pointsAgainst: number;
  pointsFor: number;
  streakLength: number;
  ties: number;
  wins: number;
  streakType: string;
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
  athlete: AthleteEntity;
  team: TeamAttributes;
}
type AthleteEntityProps = 'id' | 'fullName' | 'displayName' | 'shortName' | 'headshot' | 'jersey' | 'position';

export type AthleteEntity = { [key in AthleteEntityProps]: string } & {
  team: TeamAttributes;
  lastName?: string | null;
  active: boolean;
};
export interface Position {
  abbreviation: string;
}

export interface GoalieSummaryEntity {
  athlete: AthleteEntity;
  displayValue: string;
}

export interface ScoringEntity {
  athlete: AthleteEntity;
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
  athlete: AthleteEntity;
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
  team?: Pick<TeamAttributes, 'id'> | null;
  athletesInvolved?: AthletesInvolvedEntity[] | null;
}

export interface LastPlayType {
  id: string;
  text: string;
  abbreviation?: string | null;
}

export type AthletesInvolvedEntity = { [key in AthleteEntityProps]: string } & {
  team: Pick<TeamAttributes, 'id'>;
};

export interface NotesEntity {
  type: string;
  headline?: string | null;
  text: string;
  date?: string | null;
  source?: string | null;
}
