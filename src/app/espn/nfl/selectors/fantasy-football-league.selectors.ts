import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballLeagueState, FantasyFootballLeagueStateModel } from '../state/fantasy-football-league.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballLeagueSelectors {
  @Selector([FantasyFootballLeagueState])
  static getState(state: FantasyFootballLeagueStateModel) {
    return state;
  }

  @Selector([FantasyFootballLeagueState])
  static getLeagueId(state: FantasyFootballLeagueStateModel) {
    return state.leagueId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getCurrentScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.currentScoringPeriodId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getFirstScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.firstScoringPeriodId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getFinalScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.finalScoringPeriodId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getSeasonId(state: FantasyFootballLeagueStateModel) {
    return state.seasonId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getMatchupPeriodCount(state: FantasyFootballLeagueStateModel) {
    return state.matchupPeriodCount;
  }

  @Selector([FantasyFootballLeagueSelectors.getMatchupPeriodCount, FantasyFootballTeamSelectors.getList])
  static standings(matchupPeriodCount: number, teamList: FootballTeam[]): FootballTeam[] {
    return teamList
      .map(t => {
        return {
          ...t,
          predictedWins: exists(t.predictedWinPct) ? t.predictedWinPct * matchupPeriodCount : 0,
        };
      })
      .sort((a, b) => b.wins - a.wins);
  }
}
// 162(1.0625)21+(1.0625)2=85.9