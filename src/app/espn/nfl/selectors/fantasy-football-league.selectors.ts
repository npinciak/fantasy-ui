import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FantasyFootballLeagueState } from '../state/fantasy-football-league.state';

export class FantasyFootballLeagueSelector extends FantasyLeagueBaseSelector(FantasyFootballLeagueState) {
  @Selector([FantasyFootballLeagueSelector.getSeasonId, FantasyFootballLeagueSelector.getScoringPeriodId])
  static scoringPeriodFilters(seasonId: string | null, week: string | null) {
    return [...FootballScoringPeriod.filterOptionList(seasonId)];
  }
}
