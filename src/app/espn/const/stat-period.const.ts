import { subtractYears } from '@app/@shared/helpers/date';
import { exists } from '@app/@shared/helpers/utils';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { StatTypePeriodId } from '../models/espn-stats.model';

const BASE_STAT_PERIOD_FILTER_OPTIONS = [
  {
    value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Season }),
    label: 'Season',
  },
  {
    value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Projected }),
    label: 'Season Proj',
  },
  { value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Season, dateObj: subtractYears(1) }), label: 'Last Season' },
];

export const BASEBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = [
  ...BASE_STAT_PERIOD_FILTER_OPTIONS,
  { value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Last7 }), label: 'Last 7' },
  { value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Last15 }), label: 'Last 15' },
  { value: YearToStatTypePeriod({ periodType: StatTypePeriodId.Last30 }), label: 'Last 30' },
];

export const FOOTBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = BASE_STAT_PERIOD_FILTER_OPTIONS;

/**
 * Returns transformed statPeriodId
 * @param periodType
 * @param dateObj
 * @returns Ex: 0102022
 */
export function YearToStatTypePeriod(opts: { periodType: StatTypePeriodId; dateObj?: Date; week?: number }): string {
  const { periodType, dateObj, week } = opts;

  const date = !exists(dateObj) ? new Date() : dateObj;

  const year = date.getFullYear();

  const isProj = periodType === StatTypePeriodId.Projected;

  if (exists(week)) {
    return `${periodType}${year}${week}`;
  }

  return isProj ? `${periodType}${year}` : `0${periodType}${year}`;
}


export function StatTypePeriodToYear(statTypePeriod: string): string {
  return statTypePeriod.split('').splice(2, 6).join('');
}
