import { IdAttributesNumber, IdAttributesString } from './id-attributes.model';

export type PlayerStatsYear = Pick<IdAttributesString, 'id' | 'externalId'> &
  Pick<IdAttributesNumber, 'seasonId' | 'statSplitTypeId' | 'scoringPeriodId'> & {
    stats: PlayerStatsEntity;
    appliedAverage: number | null;
    appliedTotal: number | null;
    appliedTotalCeiling: number | null;
  };

export type PlayerStatsEntity = Record<number, number>;
export type PlayerStatsEntityMap = Record<string, PlayerStatsEntity>;
export type PlayerStatsByYearMap = Record<string, PlayerStatsYear>;
