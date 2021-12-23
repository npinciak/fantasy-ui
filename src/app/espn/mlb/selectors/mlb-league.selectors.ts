import { Selector } from '@ngxs/store';
import { Team } from '../models/team.model';
import { BaseballTeamSelectors } from './baseball-team.selector';

export class MlbLeagueSelectors {
  @Selector([BaseballTeamSelectors.selectTeamList])
  static selectStandings(teams: Team[]) {
    return teams.sort((a, b) => a.currentRank - b.currentRank);
  }
}
