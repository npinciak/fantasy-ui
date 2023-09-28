import { createPropertySelectors } from '@ngxs/store';
import { FantasyLeagueBaseStateClass, FantasyLeagueBaseStateModel, IBaseLeagueSelectorsClass } from './base-league.model';

export function FantasyLeagueBaseSelector(stateClass: FantasyLeagueBaseStateClass): IBaseLeagueSelectorsClass<FantasyLeagueBaseStateModel> {
  class EspnLeagueSelectorBase {
    static stateClass = stateClass;

    static slices = createPropertySelectors<FantasyLeagueBaseStateModel>(stateClass);
  }
  return EspnLeagueSelectorBase;
}
