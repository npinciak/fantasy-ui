import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastLeague } from '../models/fastcast-league.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';

export class EspnFastcastLeagueSelectors extends GenericSelector(EspnFastcastLeagueState) {
  @Selector([EspnFastcastLeagueSelectors.getIdSet])
  static getLeagueIdSetValid(leagueIdSet: Set<string>) {
    return leagueIdSet.size > 0;
  }

  @Selector([EspnFastcastLeagueSelectors.getLeagueIdSetValid])
  static getFeedLoadingValue(leagueIdSetValid: boolean) {
    return leagueIdSetValid ? 33 : 0;
  }

  @Selector([EspnFastcastLeagueSelectors.getList, EspnFastcastLeagueSelectors.getIdSet, EspnFastcastEventSelectors.getList])
  static getValidList(leagueList: FastcastLeague[], leagueIdSet: Set<string>, eventList: FastcastEvent[]) {
    // eventList.filter(e => leagueIdSet.has(e.leagueId));
    return leagueList;
  }
}
