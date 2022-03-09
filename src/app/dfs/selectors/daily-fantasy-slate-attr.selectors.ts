import { Selector } from '@ngxs/store';
import { Team } from '../models/team.model';
import { SlateTeam, SlateTeamMap } from '../service/slate.service';
import { DailyFantasySlateAttrState } from '../state/daily-fantasy-slate-attr.state';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

export class DailyFantasySlateAttrSelectors {
  @Selector([DailyFantasySlateAttrState.playerMap])
  static selectPlayerById(map: Record<string, any>): (id: string) => unknown {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasySlateAttrState.teamMap])
  static selectTeamById(map: SlateTeamMap): (id: string) => SlateTeam {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasySlateAttrState.teamMap, DailyFantasyTeamsSelectors.selectTeamById])
  static selectTeamList(map: SlateTeamMap, selectTeamById: (id: string) => Team): TeamList[] {
    return Object.values(map).map(t => ({
      ...t,
      team: selectTeamById(t.id),
    }));
  }
}

export type TeamList = SlateTeam & Pick<Team, 'id'> & { team: Team };
