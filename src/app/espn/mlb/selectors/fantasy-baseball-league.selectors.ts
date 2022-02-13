import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@ngxs/store';
import { BaseballTeam } from '../models/baseball-team.model';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  static standings(teamList: BaseballTeam[]): BaseballTeam[] {
    return teamList.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  @Selector()
  static statsGroup(list: string[]): FilterOptions[] {
    return [];
  }
}
