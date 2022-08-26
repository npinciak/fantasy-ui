import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { EspnFastcastTeamState } from '../state/espn-fastcast-team.state';

export class EspnFastcastTeamSelectors extends GenericSelector(EspnFastcastTeamState) {
  @Selector([EspnFastcastTeamSelectors.getList])
  static getTeamsByEventUid(list: FastcastEventTeam[]): (eventUid: string) => { [id: string]: FastcastEventTeam } {
    return (eventUid: string) =>
      list
        .filter(l => l?.eventUid === eventUid)
        .reduce((obj, val) => {
          obj[val.isHome] = val;
          return obj;
        }, {});
  }
}
