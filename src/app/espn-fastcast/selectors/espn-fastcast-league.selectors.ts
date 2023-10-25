import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { DateHelper } from '@app/@shared/helpers/date-helper';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import * as DateFns from 'date-fns';
import { FastcastLeague } from '../models/fastcast-league.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';

export class EspnFastcastLeagueSelectors extends GenericSelector(EspnFastcastLeagueState) {
  @Selector([EspnFastcastLeagueSelectors.getList])
  static getLeagueList(leagueList: FastcastLeague[]): FilterOptions<string>[] {
    return leagueList.map(l => ({ value: l.id, label: l.shortName }));
  }

  @Selector()
  static dateFilterList(): FilterOptions<string>[] {
    const dateHelper = new DateHelper();
    const today = dateHelper.formatWithDelimiter({ date: new Date().getTime() });
    const yesterday = dateHelper.formatWithDelimiter({ date: dateHelper.getYesterday().getTime() });
    const tomorrow = dateHelper.formatWithDelimiter({ date: dateHelper.getTomorrow().getTime() });

    return [
      {
        value: yesterday,
        label: `Yesterday ${DateFns.format(dateHelper.getYesterday().getTime(), 'MM/dd')}`,
      },
      { value: today, label: 'Today' },
      {
        value: tomorrow,
        label: `Tomorrow ${DateFns.format(dateHelper.getTomorrow().getTime(), 'MM/dd')}`,
      },
    ];
  }
}
