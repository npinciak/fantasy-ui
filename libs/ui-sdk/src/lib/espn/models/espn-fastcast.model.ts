/* eslint-disable @typescript-eslint/no-namespace */
import { EventStatus, EventStatusType, SeasonType } from '../../espn-client/espn-client.m';

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

  /**
   * @deprecated
   */
  export type SportsEntity = Omit<EntityBase, 'abbreviation'> & {
    leagues: LeaguesEntity[];
  };

  /**
   * @deprecated
   */
  export type LeaguesEntity = EntityBase & {
    isTournament: boolean;
    events?: EventsEntity[];
  };

  /**
   * @deprecated
   */
  export type EventsEntity = Omit<EntityBase, 'abbreviation' | 'slug'> & {
    competitionId: string;
    date: string;
    location: string;
    season: number;
    seasonType: SeasonType;
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

  /**
   * @deprecated
   */
  export interface EspnClientOddsEntity {
    details: string;
    overUnder: number;
    spread: number;
    homeTeamOdds: EspnClientTeamOddsEntity;
    awayTeamOdds: EspnClientTeamOddsEntity;
  }

  /**
   * @deprecated
   */
  export interface EspnClientTeamOddsEntity {
    favorite: boolean;
    underdog: boolean;
    moneyLine: number;
    spreadOdds: number;
    team: TeamAttributes;
  }

  export type EspnClientGroup = Pick<EntityBase, 'name' | 'abbreviation' | 'shortName'> & { groupId: string };

  export type FullStatus = { type: FullStatusType };
  export type FullStatusType = { id: EventStatusType; name: string; state: string; completed: boolean };

  /**
   * @deprecated
   */
  export type TeamAttributes = Pick<EntityBase, 'id' | 'abbreviation'>;

  /**
   * @deprecated
   */
  export type CompetitorsEntity = Omit<EntityBase, 'slug' | 'shortName'> & {
    type: string;
    order: number;
    homeAway: string;
    score: string;
    aggregateScore?: number;
    record?: string | RecordEntity[];
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

  /**
   * @deprecated
   */
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

  /**
   * @deprecated
   */
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

  /**
   * @deprecated
   */
  export interface Leader {
    displayValue: string;
    value: number;
    athlete: AthleteEntity;
    team: TeamAttributes;
  }

  /**
   * @deprecated
   */
  export type AthleteEntity = AthleteEntityProps<string> & {
    team: TeamAttributes;
    lastName?: string | null;
    active: boolean;
  };

  /**
   * @deprecated
   */
  type AthleteActionEntity = { athlete: AthleteEntity; displayValue: string };
  /**
   * @deprecated
   */
  export type PositionEntity = Pick<EntityBase, 'abbreviation'>;
  /**
   * @deprecated
   */
  export type GoalieSummaryEntity = AthleteActionEntity;
  /**
   * @deprecated
   */
  export type ScoringEntity = AthleteActionEntity;

  /**
   * @deprecated
   */
  export interface Uniform {
    type: string;
    color: string;
    alternateColor?: string | null;
  }

  /**
   * @deprecated
   */
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
  /**
   * @deprecated
   */
  export interface MlbSituationAthlete {
    playerId: number;
    summary: string;
    athlete: AthleteEntity;
  }
  /**
   * @deprecated
   */
  export type LastPlay = Pick<EntityBase, 'id'> & {
    type: LastPlayType;
    text: string;
    scoreValue: number;
    team?: Pick<TeamAttributes, 'id'> | null;
    athletesInvolved?: AthletesInvolvedEntity[] | null;
  };
  /**
   * @deprecated
   */
  export type LastPlayType = Pick<EntityBase, 'id'> & {
    text: string;
    abbreviation?: string | null;
  };
  /**
   * @deprecated
   */
  export type AthletesInvolvedEntity = AthleteEntityProps<string> & {
    team: Pick<TeamAttributes, 'id'>;
  };

  /**
   * @deprecated
   */
  export interface NotesEntity {
    type: string;
    headline?: string | null;
    text: string;
    date?: string | null;
    source?: string | null;
  }
}
