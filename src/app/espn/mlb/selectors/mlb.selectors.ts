import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../class/team.class';
import { baseballTeamLiveScoreMap } from '../helpers';
import { BaseballTeamMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';
import { MlbTeamSelectors } from './mlb-team.selectors';

export class MlbSelectors {
  @Selector([MlbTeamSelectors.baseballTeamMap])
  static standings(teams: BaseballTeamMap) {
    return Object.values(teams);
  }

  @Selector([MlbTeamSelectors.baseballTeamMap, MlbState.schedule])
  static liveScore(teams: BaseballTeamMap, schedule: ScheduleMap): BaseballTeam[] {
    const map = baseballTeamLiveScoreMap(teams, schedule);
    return Object.values(map).sort((a, b) => b.liveScore - a.liveScore);
  }
}
