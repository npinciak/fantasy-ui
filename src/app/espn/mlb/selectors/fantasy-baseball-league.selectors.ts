import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../models/baseball-team.model';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  static standings(teamList: BaseballTeam[]) {
    return teamList.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  @Selector([FantasyBaseballLeagueState.statsGroup])
  static statsGroup(list: string[]) {
    return list;
  }
}
