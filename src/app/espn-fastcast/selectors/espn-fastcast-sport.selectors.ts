import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnFastcastSportState } from '../state/espn-fastcast-sport.state';

export class EspnFastcastSportSelectors extends GenericSelector(EspnFastcastSportState) {
  @Selector([EspnFastcastSportSelectors.getIdSet])
  static getSportIdSetValid(sportIdSet: Set<string>) {
    return sportIdSet.size > 0;
  }

  @Selector([EspnFastcastSportSelectors.getSportIdSetValid])
  static getFeedLoadingValue(sportIdSetValid: boolean) {
    return sportIdSetValid ? 33 : 0;
  }
}
