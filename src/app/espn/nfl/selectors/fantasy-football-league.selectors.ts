import { Selector } from '@app/@shared/models/typed-selector';
import { YearToScoringPeriodId } from '@app/espn/const/stat-period.const';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
import { FootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FantasyFootballLeagueStateModel } from '../models/football-league-state.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballLeagueState } from '../state/fantasy-football-league.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballLeagueSelectors {
  @Selector([FantasyFootballLeagueState])
  static isLoading(state: FantasyFootballLeagueStateModel) {
    return state.isLoading;
  }

  @Selector([FantasyFootballLeagueState])
  static getLeagueId(state: FantasyFootballLeagueStateModel) {
    return state.id;
  }

  @Selector([FantasyFootballLeagueState.getState])
  static getCurrentScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.scoringPeriodId;
  }

  @Selector([FantasyFootballLeagueState.getState])
  static getFirstScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.firstScoringPeriod;
  }

  @Selector([FantasyFootballLeagueState.getState])
  static getFinalScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.finalScoringPeriod;
  }

  @Selector([FantasyFootballLeagueState.getState])
  static getSeasonId(state: FantasyFootballLeagueStateModel) {
    return state.seasonId;
  }

  @Selector([FantasyFootballLeagueState.getState])
  static getMatchupPeriodCount(state: FantasyFootballLeagueStateModel) {
    return state.matchupPeriodCount;
  }

  @Selector([FantasyFootballTeamSelectors.getList])
  static standings(teamList: FootballTeam[]): FootballTeam[] {
    return teamList.sort((a, b) => b.wins - a.wins);
  }

  @Selector([FantasyFootballLeagueSelectors.getCurrentScoringPeriodId])
  static getCurrentStatTypePeriod(getCurrentScoringPeriodId: string | null) {
    return YearToScoringPeriodId({
      periodType: StatTypePeriodId.ProjectedWeek,
      dateObj: new Date(),
      week: getCurrentScoringPeriodId ? getCurrentScoringPeriodId : '0',
    });
  }

  @Selector([
    FantasyFootballLeagueSelectors.getSeasonId,
    FantasyFootballLeagueSelectors.getCurrentScoringPeriodId,
    FantasyFootballLeagueSelectors.getCurrentStatTypePeriod,
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
