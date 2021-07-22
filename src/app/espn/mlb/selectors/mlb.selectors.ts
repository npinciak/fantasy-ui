import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../class/team.class';
import { BaseballTeamMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';
import { MlbTeamSelectors } from './mlb-team.selectors';

export class MlbSelectors {
  @Selector([MlbTeamSelectors.baseballTeamMap])
  static standings(teams: BaseballTeamMap) {
    return Object.values(teams);
  }

  @Selector([MlbTeamSelectors.baseballTeamMap])
  static liveScore(teams: BaseballTeamMap): BaseballTeam[] {
    return Object.values(teams).sort((a, b) => b.liveScore - a.liveScore);
  }
}
