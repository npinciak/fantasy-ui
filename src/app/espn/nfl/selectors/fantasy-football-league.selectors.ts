import { Selector } from '@app/@shared/models/typed-selector';
import { FOOTBALL_STAT_PERIOD_FILTER_OPTIONS, YearToStatTypePeriod } from '@app/espn/const/stat-period.const';
import { StatTypePeriodId } from '@app/espn/models/espn-stats.model';
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
    return state.leagueId;
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
  static getCurrentStatTypePeriod(getCurrentScoringPeriodId: number | null) {
    return YearToStatTypePeriod({
      periodType: StatTypePeriodId.ProjectedWeek,
      dateObj: new Date(),
      week: getCurrentScoringPeriodId ? getCurrentScoringPeriodId : 0,
    });
  }

  @Selector([FantasyFootballLeagueSelectors.getCurrentScoringPeriodId, FantasyFootballLeagueSelectors.getCurrentStatTypePeriod])
  static scoringPeriodFilters(week: number, currentScoringPeriodId: string) {
    return [
      ...FOOTBALL_STAT_PERIOD_FILTER_OPTIONS,
      {
        value: currentScoringPeriodId,
        label: `Proj Week ${week}`,
      },
    ];
  }
}
