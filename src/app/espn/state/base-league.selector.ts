import { Selector } from '@app/@shared/models/typed-selector';
import { createPropertySelectors } from '@ngxs/store';
import { FantasyLeagueBaseStateClass, FantasyLeagueBaseStateModel } from './base-league.model';

export function FantasyLeagueBaseSelector(stateClass: FantasyLeagueBaseStateClass) {
  class EspnLeagueSelectorBase {
    static stateClass = stateClass;

    static slices = createPropertySelectors<FantasyLeagueBaseStateModel>(stateClass);

    @Selector([EspnLeagueSelectorBase.slices.scoringPeriodId, EspnLeagueSelectorBase.slices.finalScoringPeriod])
    static getSeasonConcluded(currentScoringPeriod: string | null, finalScoringPeriod: string | null) {
      return currentScoringPeriod != null && finalScoringPeriod != null ? Number(currentScoringPeriod) > Number(finalScoringPeriod) : false;
    }
  }
  return EspnLeagueSelectorBase;
}
