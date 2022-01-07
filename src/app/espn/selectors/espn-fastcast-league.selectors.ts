import { Selector } from '@ngxs/store';

import { FastcastLeague } from '../models/fastcast-league.model';
import { League } from '../models/league.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';

export class EspnFastcastLeagueSelectors {
  @Selector([EspnFastcastLeagueState.selectMap])
  static selectLeagueById(map: { [id: string]: FastcastLeague }): (id: string) => FastcastLeague {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastLeagueState.selectMap])
  static selectPrettyLeagueList(map: { [id: string]: FastcastLeague }): League[] {
    return Object.values(map);
  }
}
