import { Selector } from '@ngxs/store';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { EspnFastcastTeamState } from '../state/espn-fastcast-team.state';

export class EspnFastcastTeamSelectors {
  @Selector([EspnFastcastTeamState.selectMap])
  static getTeamById(map: Record<string, FastcastEventTeam>): (id: string) => FastcastEventTeam {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastTeamState.selectMap])
  static selectTeamList(map: Record<string, FastcastEventTeam>): FastcastEventTeam[] {
    return Object.values(map);
  }

  @Selector([EspnFastcastTeamSelectors.selectTeamList])
  static getTeamsByEventUid(list: FastcastEventTeam[]): (id: string) => { [id: string]: FastcastEventTeam } {
    return (id: string) =>
      list
        .filter(l => l?.eventUid === id)
        .reduce((obj, val) => {
          obj[val.isHome] = val;
          return obj;
        }, {});
  }
}
