import { FilterOptions } from '@app/@shared/models/filter.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { StatTypePeriodId } from '../models/espn-stats.model';

const BASE_STAT_PERIOD_FILTER_OPTIONS = [
  {
    value: YearToScoringPeriodId({ periodType: StatTypePeriodId.Season }),
    label: 'Season',
  },
  {
    value: YearToScoringPeriodId({ periodType: StatTypePeriodId.Projected }),
    label: 'Season Proj',
  },
];

export const BASEBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = [
  ...BASE_STAT_PERIOD_FILTER_OPTIONS,
  { value: YearToScoringPeriodId({ periodType: StatTypePeriodId.Last7 }), label: 'Last 7' },
  { value: YearToScoringPeriodId({ periodType: StatTypePeriodId.Last15 }), label: 'Last 15' },
  { value: YearToScoringPeriodId({ periodType: StatTypePeriodId.Last30 }), label: 'Last 30' },
];

export const FOOTBALL_STAT_PERIOD_FILTER_OPTIONS: FilterOptions<string>[] = BASE_STAT_PERIOD_FILTER_OPTIONS;

/**
 * Returns transformed statPeriodId
 *
 * @param periodType
 * @param dateObj
 *
 * @deprecated extend BaseScoringPeriod method instead
 *
 * @example
 * YearToStatTypePeriod({ periodType: StatTypePeriodId.Last7 })
 * // returns 0102022
 */
export function YearToScoringPeriodId(opts: { periodType: StatTypePeriodId; dateObj?: Date; week?: string }): string {
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

export function BaseScoringPeriod() {
  class BaseScoringPeriodClass {
    static season(year: string) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Season, year);
    }

    static seasonProjection(year: string) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Projected, year);
    }

    static lastSeason(year: string) {
      const previousSeason = Number(year) - 1;
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Season, previousSeason.toString());
    }

    static filterOptionList(year: string) {
      return [
        {
          value: BaseScoringPeriodClass.season(year),
          label: 'Season',
        },
        {
          value: BaseScoringPeriodClass.seasonProjection(year),
          label: 'Season Proj',
        },
        { value: BaseScoringPeriodClass.lastSeason(year), label: 'Last Season' },
      ];
    }

    static filterOptionMap(year: string) {
      return BaseScoringPeriodClass.filterOptionList(year).reduce((acc, val) => {
        acc[val.label] = val;
        return acc;
      }, {});
    }

    private static seasonToScoringPeriodId(statTypePeriodId: StatTypePeriodId, year: string, week?: number): string {
      if (week) return `${statTypePeriodId}${year}${week}`;
      if (statTypePeriodId === StatTypePeriodId.Projected) return `${statTypePeriodId}${year}`;
      return `0${statTypePeriodId}${year}`;
    }
  }
  return BaseScoringPeriodClass;
}
