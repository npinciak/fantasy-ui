import { BaseScoringPeriod } from '../const/stat-period.const';
import { StatTypePeriodId } from '../models/espn-stats.model';

export class FantasyBaseballScoringPeriod extends BaseScoringPeriod() {
  static filterOptionListWithWeeks(season: string | null) {
    return [
      { value: FantasyBaseballScoringPeriod.seasonToScoringPeriodId(StatTypePeriodId.Last7, season), label: 'Last 7' },
      { value: FantasyBaseballScoringPeriod.seasonToScoringPeriodId(StatTypePeriodId.Last15), label: 'Last 15' },
      { value: FantasyBaseballScoringPeriod.seasonToScoringPeriodId(StatTypePeriodId.Last30), label: 'Last 30' },
      ...FantasyBaseballScoringPeriod.filterOptionList(season),
    ];
  }
}
