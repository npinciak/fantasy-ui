import { Selector } from '@ngxs/store';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { Team } from '../models/team.model';
import { SlateTeam, SlateTeamMap } from '../service/slate.service';

export class DailyFantasySlateAttrSelectors {
  /**
   * @deprecated
   */
  @Selector()
  static selectPlayerById(map: Record<string, PlayerSlateAttr>): (id: string) => PlayerSlateAttr {
    return (id: string) => map[id];
  }

  /**
   * @deprecated
   */
  @Selector()
  static selectTeamById(map: SlateTeamMap): (id: string) => SlateTeam {
    return (id: string) => map[id];
  }

  /**
   * @deprecated
   */
  @Selector([])
  static selectTeamList(map: SlateTeamMap, selectTeamById: (id: string) => Team): TeamList[] {
    return Object.values(map).map(t => ({
      ...t,
      team: selectTeamById(t.id),
    }));
  }
}

export type TeamList = SlateTeam & Pick<Team, 'id'> & { team: Team };
