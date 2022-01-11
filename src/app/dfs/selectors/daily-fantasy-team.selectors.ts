import { Selector } from '@ngxs/store';

import { Team } from '../models/team.model';
import { DailyFantasyTeamsState } from '../state/daily-fantasy-team.state';

export class DailyFantasyTeamsSelectors {
  @Selector([DailyFantasyTeamsState.getMap])
  static selectGameById(map: { [id: string]: Team }): (id: string) => Team {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyTeamsState.getMap])
  static selectGameList(map: { [id: string]: Team }): Team[] {
    return Object.values(map);
  }
}