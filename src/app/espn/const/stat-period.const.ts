import { subtractYears } from '@app/@shared/helpers/date';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { StatTypePeriodId } from '../models/espn-stats.model';

const BASE_STAT_PERIOD_FILTER_OPTIONS = [
  {
    value: YearToStatTypePeriod(StatTypePeriodId.Season),
    label: 'Season',
  },
  {
    value: YearToStatTypePeriod(StatTypePeriodId.Projected),
    label: 'Season Proj',
  },
  { value: YearToStatTypePeriod(StatTypePeriodId.Season, subtractYears(1)), label: 'Last Season' },
];

export const BASEBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = [
  ...BASE_STAT_PERIOD_FILTER_OPTIONS,
  { value: YearToStatTypePeriod(StatTypePeriodId.Last7), label: 'Last 7' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Last15), label: 'Last 15' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Last30), label: 'Last 30' },
];

export const FOOTBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = BASE_STAT_PERIOD_FILTER_OPTIONS;

/**
 * Returns transformed statPeriodId
 * @param periodType
 * @param dateObj
 * @returns Ex: 0102022
 */
export function YearToStatTypePeriod(periodType: StatTypePeriodId, dateObj = new Date()): string {
  const year = dateObj.getFullYear();

  const isProj = periodType === StatTypePeriodId.Projected;

  return isProj ? `${periodType}${year}` : `0${periodType}${year}`;
}

export function StatTypePeriodToYear(statTypePeriod: string): string {
  return statTypePeriod.split('').splice(2, 6).join('');
}
