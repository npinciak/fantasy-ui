import { League } from '@app/espn/models/league.model';
import { Selector } from '@ngxs/store';
import { FastcastLeague, FastcastLeagueMap } from '../models/fastcast-league.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';

export class EspnFastcastLeagueSelectors {
  @Selector([EspnFastcastLeagueState.selectMap])
  static selectLeagueById(map: FastcastLeagueMap): (id: string) => FastcastLeague {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastLeagueState.selectMap])
  static selectPrettyLeagueList(map: FastcastLeagueMap): League[] {
    return Object.values(map);
  }
}
