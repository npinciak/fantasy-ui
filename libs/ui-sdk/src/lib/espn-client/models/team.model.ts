import { IdAttributesNumber } from './id-attributes.model';
import { RecordEntity } from './record-entity.model';
import { TeamRoster } from './team-roster.model';

export type TeamAttributes = Pick<IdAttributesNumber, 'id' | 'teamId'> & {
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
  rosterForCurrentScoringPeriod: TeamRoster;
  abbrev: string;
  location: string;
  nickname: string;
  roster: TeamRoster;
  points: number;
  logo: string;
  playoffSeed: number;
  draftDayProjectedRank: number;
  currentProjectedRank: number;
  rankCalculatedFinal: number;
  pointsByStat: Record<number, number>;
  valuesByStat: Record<number, number>;
};

export type Team = Omit<TeamAttributes, 'teamId' | 'rosterForCurrentScoringPeriod'>;
export type BaseballTeam = Team & { record: string };
export type FootballTeam = Team & { record: TeamRecordEntity };

type TeamRecordEntityAttributes = 'away' | 'division' | 'home' | 'overall';
export type TeamRecordEntity = { [prop in TeamRecordEntityAttributes]: RecordEntity };
