import { Selector } from '@app/@shared/models/typed-selector';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveSelector } from './fantasy-baseball-teams-live.selector';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamsSelector.getList, FantasyBaseballTeamsLiveSelector.getById])
  static standings(teamList: BaseballTeam[], getById: (id: string | null) => BaseballTeamLive): BaseballTeam[] {
    return teamList
      .map(t => {
        const liveTeam = getById(t.id);
        return {
          ...t,
          liveScore: liveTeam.liveScore,
        };
      })
      .sort((a, b) => b.liveScore - a.liveScore);
  }
}
