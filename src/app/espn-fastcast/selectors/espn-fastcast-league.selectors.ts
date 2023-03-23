import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { espnDateFormatter, getTomorrowDate, getYesterdayDate } from '@app/@shared/helpers/date';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import * as DateFns from 'date-fns';
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

  @Selector()
  static dateFilterList(): FilterOptions<string>[] {
    return [
      {
        value: espnDateFormatter({ date: getYesterdayDate().getTime() }),
        label: `Yesterday ${DateFns.format(getYesterdayDate().getTime(), 'MM/dd')}`,
      },
      { value: espnDateFormatter({ date: new Date().getTime() }), label: 'Today' },
      {
        value: espnDateFormatter({ date: getTomorrowDate().getTime() }),
        label: `Tomorrow ${DateFns.format(getTomorrowDate().getTime(), 'MM/dd')}`,
      },
    ];
  }
}
