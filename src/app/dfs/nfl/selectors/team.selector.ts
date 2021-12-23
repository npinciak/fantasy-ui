import { Selector } from '@ngxs/store';

import { TeamAwayOrTeamHome } from '@app/dfs/mlb/models/dfsPlayer.interface';
import { NflDfsTeamState } from '../state/nfl-dfs-team.state';

export class NFLTeamSelectors {
  @Selector([NflDfsTeamState.rgTeams])
  static getTeamByRgId(teams: { [id: string]: TeamAwayOrTeamHome }): (id: string) => TeamAwayOrTeamHome {
    return (id: string) => teams[id];
  }

  @Selector([NflDfsTeamState.teams])
  static getTeamById(teams: { [id: string]: TeamAwayOrTeamHome }): (id: string) => TeamAwayOrTeamHome {
    return (id: string) => teams[id];
  }

  @Selector([NflDfsTeamState.teams])
  static selectTeamsList(teams: { [id: string]: TeamAwayOrTeamHome }): string[] {
    const set = new Set<string>();
    Object.values(teams).map(team => {
      if (team.hashtag) {
        set.add(team.hashtag);
      }
    });
    return Array.from(set).sort();
  }
}
