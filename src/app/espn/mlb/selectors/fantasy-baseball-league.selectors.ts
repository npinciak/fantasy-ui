import { Team } from '@app/espn/models/team.model';
import { Selector } from '@ngxs/store';
import { FantasyBaseballTeamSelectors } from './fantasy-baseball-team.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamSelectors.selectTeamList])
  static selectStandings(teams: Team[]) {
    return teams;
  }
}
