import { FilterOptions } from '@app/@shared/models/filter.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { StatTypePeriodId } from '../models/espn-stats.model';

/**
 * Base function that returns stat scoring periods
 *
 * @example ```typescript
 *
 * BaseScoringPeriodTest.season('2022'); // returns '002022';
 *
 * ```
 */
export function BaseScoringPeriod() {
  class BaseScoringPeriodClass {
    static season(year: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Season, year);
    }

    static seasonProjection(year: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Projected, year);
    }

    static lastSeason(year: string | null) {
      const previousSeason = !exists(year) ? new Date().getFullYear() - 2 : Number(year) - 1;
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Season, previousSeason.toString());
    }

    static liveScoring(eventId: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.Live, eventId);
    }

    static filterOptionList(year: string | null) {
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

    static filterOptionMap(year: string | null) {
      return BaseScoringPeriodClass.filterOptionList(year).reduce((acc, val) => {
        acc[val.label] = val;
        return acc;
      }, {} as Record<string, FilterOptions<string>>);
    }

    static projectedWeek(year: string | null, week: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(StatTypePeriodId.ProjectedWeek, year, week);
    }

    protected static seasonToScoringPeriodId(statTypePeriodId: StatTypePeriodId, year?: string | null, week?: string | null): string {
      const isProjected = statTypePeriodId === StatTypePeriodId.Projected;

      const season = year ?? new Date().getFullYear();
      const upcomingWeek = week ?? '0';

      if (isProjected) return `${statTypePeriodId}${season}`;

      if (!exists(year) && !isProjected) return `0${statTypePeriodId}${season}`;

      if (exists(week)) return `${statTypePeriodId}${season}${upcomingWeek}`; //1120231

      return `0${statTypePeriodId}${season}`;
    }
  }
  return BaseScoringPeriodClass;
}
