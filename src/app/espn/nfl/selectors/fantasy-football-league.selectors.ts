import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballLeagueState } from '../state/fantasy-football-league.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballLeagueSelector extends FantasyLeagueBaseSelector(FantasyFootballLeagueState) {
  @Selector([FantasyFootballTeamSelectors.getList])
  static standings(teamList: FootballTeam[]): FootballTeam[] {
    return teamList.sort((a, b) => b.wins - a.wins);
  }

  @Selector([FantasyFootballLeagueSelector.getSeasonId, FantasyFootballLeagueSelector.getScoringPeriodId])
  static scoringPeriodFilters(seasonId: string | null, week: string | null) {
    return [...FootballScoringPeriod.filterOptionList(seasonId), ...FootballScoringPeriod.projectedWeek(seasonId, week)];
  }
}
