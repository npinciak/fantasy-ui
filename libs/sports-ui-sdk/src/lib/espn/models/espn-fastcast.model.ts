/* eslint-disable @typescript-eslint/no-namespace */
import { LegacyEspnClient } from './espn-client-legacy.model';
import { EventStatus, SeasonId } from './espn-client.model';

export namespace LegacyEspnFastcastClient {
  interface EntityBaseAttributes<T> {
    id: T;
    uid: T;
    name: T;
    shortName: T;
    abbreviation: T;
    slug: T;
  }

  export type EntityBase = EntityBaseAttributes<string>;

  export interface EspnClientFastcast {
    sports: SportsEntity[];
  }

  export type SportsEntity = Omit<EntityBase, 'abbreviation'> & {
    leagues: LeaguesEntity[];
  };

  export type LeaguesEntity = EntityBase & {
    isTournament: boolean;
    events?: EventsEntity[];
  };

  export type EventsEntity = Omit<EntityBase, 'abbreviation' | 'slug'> & {
    competitionId: string;
    date: string;
    location: string;
    season: number;
    seasonType: SeasonId;
    period: number;
    clock: string;
    status: EventStatus;
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

  export type EspnClientGroup = Pick<EntityBase, 'name' | 'abbreviation' | 'shortName'> & { groupId: string };

  export type FullStatus = { type: FullStatusType };
  export type FullStatusType = { id: LegacyEspnClient.GameStatusTypeId; name: string; state: string; completed: boolean };

  export type TeamAttributes = Pick<EntityBase, 'id' | 'abbreviation'>;

  export type CompetitorsEntity = Omit<EntityBase, 'slug' | 'shortName'> & {
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
    seriesRecord?: string | null;
  };

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

  type AthleteEntityProps<T> = Pick<EntityBase, 'id'> & {
    fullName: T;
    displayName: T;
    shortName: T;
    headshot: T;
    jersey: T;
    position: T;
  };

  export type Leaders = Pick<EntityBase, 'name' | 'abbreviation'> &
    Pick<AthleteEntity, 'displayName'> & {
      shortDisplayName: string;
      leaders?: Leader[] | null;
    };

  export interface Leader {
    displayValue: string;
    value: number;
    athlete: AthleteEntity;
    team: TeamAttributes;
  }

  export type AthleteEntity = AthleteEntityProps<string> & {
    team: TeamAttributes;
    lastName?: string | null;
    active: boolean;
  };

  type AthleteActionEntity = { athlete: AthleteEntity; displayValue: string };

  export type PositionEntity = Pick<EntityBase, 'abbreviation'>;

  export type GoalieSummaryEntity = AthleteActionEntity;

  export type ScoringEntity = AthleteActionEntity;

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

  export type LastPlay = Pick<EntityBase, 'id'> & {
    type: LastPlayType;
    text: string;
    scoreValue: number;
    team?: Pick<TeamAttributes, 'id'> | null;
    athletesInvolved?: AthletesInvolvedEntity[] | null;
  };

  export type LastPlayType = Pick<EntityBase, 'id'> & {
    text: string;
    abbreviation?: string | null;
  };

  export type AthletesInvolvedEntity = AthleteEntityProps<string> & {
    team: Pick<TeamAttributes, 'id'>;
  };

  export interface NotesEntity {
    type: string;
    headline?: string | null;
    text: string;
    date?: string | null;
    source?: string | null;
  }
}
