import { Selector } from '@app/@shared/models/typed-selector';
import { YearToScoringPeriodId } from '@app/espn/const/stat-period.const';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
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

  @Selector([FantasyFootballLeagueSelector.getScoringPeriodId])
  static getCurrentStatTypePeriod(getCurrentScoringPeriodId: string | null) {
    return YearToScoringPeriodId({
      periodType: StatTypePeriodId.ProjectedWeek,
      dateObj: new Date(),
      week: getCurrentScoringPeriodId ? getCurrentScoringPeriodId : '0',
    });
  }

  @Selector([
    FantasyFootballLeagueSelector.getSeasonId,
    FantasyFootballLeagueSelector.getScoringPeriodId,
    FantasyFootballLeagueSelector.getCurrentStatTypePeriod,
  ])
  static scoringPeriodFilters(seasonId: string | null, week: string | null, currentScoringPeriodId: string) {
    return [
      ...FootballScoringPeriod.filterOptionList(seasonId!.toString() ?? new Date().getFullYear()),
      {
        value: currentScoringPeriodId,
        label: `Proj Week ${week}`,
      },
    ];
  }
}
