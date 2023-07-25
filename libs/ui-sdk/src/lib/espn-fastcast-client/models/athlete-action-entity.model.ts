import { AthleteEntity } from './athlete-entity.model';

type AthleteActionEntity = { athlete: AthleteEntity; displayValue: string };

export type GoalieSummaryEntity = AthleteActionEntity;

export type ScoringEntity = AthleteActionEntity;
