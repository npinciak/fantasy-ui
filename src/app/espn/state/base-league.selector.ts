import { Selector } from '@app/@shared/models/typed-selector';
import { createPropertySelectors } from '@ngxs/store';
import { FantasyLeagueBaseStateClass, FantasyLeagueBaseStateModel } from './base-league.model';

export function FantasyLeagueBaseSelector(stateClass: FantasyLeagueBaseStateClass) {
  class EspnLeagueSelectorBase {
    static stateClass = stateClass;

    static slices = createPropertySelectors<FantasyLeagueBaseStateModel>(stateClass);

    /**
     * @deprecated
     * use slices.id
     */
    @Selector([stateClass])
    static getLeagueId(state: FantasyLeagueBaseStateModel) {
      return state.id;
    }

    /**
     * @deprecated
     * use slices.id
     */
    @Selector([stateClass])
    static getSeasonId(state: FantasyLeagueBaseStateModel) {
      return state.seasonId;
    }

    @Selector([stateClass])
    static getScoringPeriodId(state: FantasyLeagueBaseStateModel) {
      return state.scoringPeriodId;
    }

    @Selector([stateClass])
    static getFirstScoringPeriod(state: FantasyLeagueBaseStateModel) {
      return state.firstScoringPeriod;
    }

    @Selector([stateClass])
    static getFinalScoringPeriod(state: FantasyLeagueBaseStateModel) {
      return state.finalScoringPeriod;
    }

    @Selector([stateClass])
    static getMatchupPeriodCount(state: FantasyLeagueBaseStateModel) {
      return state.matchupPeriodCount;
    }

    @Selector([EspnLeagueSelectorBase.getScoringPeriodId, EspnLeagueSelectorBase.getFinalScoringPeriod])
    static getSeasonConcluded(currentScoringPeriod: string | null, finalScoringPeriod: string | null) {
      return currentScoringPeriod != null && finalScoringPeriod != null ? Number(currentScoringPeriod) > Number(finalScoringPeriod) : false;
    }
  }
  return EspnLeagueSelectorBase;
}
