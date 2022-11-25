import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { FastcastLeague } from '../models/fastcast-league.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';

export class EspnFastcastLeagueSelectors extends GenericSelector(EspnFastcastLeagueState) {
  @Selector([EspnFastcastLeagueSelectors.getIdSet])
  static getLeagueIdSetValid(leagueIdSet: Set<string>) {
    return leagueIdSet.size > 0;
  }

  @Selector([EspnFastcastLeagueSelectors.getLeagueIdSetValid])
  static getFeedLoadingValue(leagueIdSetValid: boolean) {
    return leagueIdSetValid ? 33 : 0;
  }

  @Selector([EspnFastcastLeagueSelectors.getList])
  static getLeagueList(leagueList: FastcastLeague[]): FilterOptions<string>[] {
    return leagueList.map(l => ({ value: l.id, label: l.shortName }));
  }
}
