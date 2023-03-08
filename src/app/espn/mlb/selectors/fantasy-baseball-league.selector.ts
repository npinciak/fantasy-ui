import { Selector } from '@app/@shared/models/typed-selector';
import { FootballScoringPeriod } from '@app/espn/nfl/fantasy-football-scoring-period';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

export class FantasyBaseballLeagueSelector extends FantasyLeagueBaseSelector(FantasyBaseballLeagueState) {
  @Selector([FantasyBaseballLeagueSelector.getSeasonId])
  static scoringPeriodFilters(seasonId: string | null) {
    return FootballScoringPeriod.filterOptionList(seasonId);
  }
}
