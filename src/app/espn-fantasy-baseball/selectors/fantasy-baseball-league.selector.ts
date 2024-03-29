import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league/base-league.selector';
import { FantasyBaseballScoringPeriod } from '../fantasy-baseball-scoring-period';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

export class FantasyBaseballLeagueSelector extends FantasyLeagueBaseSelector(FantasyBaseballLeagueState) {
  @Selector([FantasyBaseballLeagueSelector.slices.seasonId])
  static scoringPeriodFilters(seasonId: string | null) {
    return FantasyBaseballScoringPeriod.filterOptionListWithWeeks(seasonId);
  }
}
