import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FantasyFootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FantasyFootballLeagueState } from '../state/fantasy-football-league.state';

export class FantasyFootballLeagueSelector extends FantasyLeagueBaseSelector(FantasyFootballLeagueState) {
  @Selector([FantasyFootballLeagueSelector.slices.seasonId, FantasyFootballLeagueSelector.slices.scoringPeriodId])
  static scoringPeriodFilters(seasonId: string | null, week: string | null) {
    return [...FantasyFootballScoringPeriod.filterOptionList(seasonId)];
  }
}
