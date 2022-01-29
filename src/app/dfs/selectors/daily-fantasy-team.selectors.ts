import { Selector } from '@ngxs/store';
import { Team, TeamMap } from '../models/team.model';
import { DailyFantasyTeamsState } from '../state/daily-fantasy-team.state';

export class DailyFantasyTeamsSelectors {
  @Selector([DailyFantasyTeamsState.getMap])
  static selectTeamById(map: TeamMap): (id: string) => Team {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyTeamsState.getMap])
  static selectTeamList(map: TeamMap): Team[] {
    return Object.values(map);
  }
}
