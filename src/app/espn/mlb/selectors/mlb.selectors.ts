import { newTeamMap } from '@app/@shared/helpers/mapping';
import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../class/team.class';
import { BaseballTeamMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';

export class MlbSelectors {
  @Selector([MlbState.teams, MlbState.schedule])
  static baseballTeamMap(teams: TeamMap, schedule: ScheduleMap): BaseballTeamMap {
    return newTeamMap(teams, Object.values(schedule));
  }

  @Selector([MlbSelectors.baseballTeamMap])
  static standings(teams: BaseballTeamMap) {
    return Object.values(teams);
  }

  @Selector([MlbSelectors.baseballTeamMap])
  static liveScore(teams: BaseballTeamMap): BaseballTeam[] {
    return Object.values(teams).sort((a, b) => b.liveScore - a.liveScore);
  }
}
