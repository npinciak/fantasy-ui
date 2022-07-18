import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyFootballLeagueState, FantasyFootballLeagueStateModel } from '../state/fantasy-football-league.state';

export class FantasyFootballLeagueSelectors {
  @Selector([FantasyFootballLeagueState])
  static getState(state: FantasyFootballLeagueStateModel) {
    return state;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getScoringPeriodId(state: FantasyFootballLeagueStateModel) {
    return state.scoringPeriodId;
  }

  @Selector([FantasyFootballLeagueSelectors.getState])
  static getSeasonId(state: FantasyFootballLeagueStateModel) {
    return state.seasonId;
  }
}
