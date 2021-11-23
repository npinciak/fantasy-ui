import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../models/baseball-team.model';
import { baseballTeamLiveScoreMap } from '../helpers';
import { Team } from '../models/team.model';
import { BaseballTeamMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';
import { BaseballTeamSelectors } from './baseball-team.selector';
import { MlbTeamSelectors } from './mlb-team.selectors';

export class MlbLeagueSelectors {
  @Selector([BaseballTeamSelectors.selectTeamList])
  static selectStandings(teams: Team[]) {
    return teams.sort((a, b) => a.currentRank - b.currentRank);
  }

  @Selector([MlbTeamSelectors.baseballTeamMap, MlbState.schedule])
  static liveScore(teams: BaseballTeamMap, schedule: ScheduleMap): BaseballTeam[] {
    const map = baseballTeamLiveScoreMap(teams, schedule);
    return Object.values(map).sort((a, b) => b.liveScore - a.liveScore);
  }
}
