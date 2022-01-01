import { Selector } from '@ngxs/store';
import { Team } from '../models/team.model';
import { FantasyBaseballTeamSelectors } from './fantasy-baseball-team.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamSelectors.selectTeamList])
  static selectStandings(teams: Team[]) {
    return teams.sort((a, b) => a.currentRank - b.currentRank);
  }
}
