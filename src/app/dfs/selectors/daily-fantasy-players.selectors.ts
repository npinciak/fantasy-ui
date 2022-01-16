import { Selector } from '@ngxs/store';
import { Player, PlayerTableRow } from '../models/player.model';
import { Team } from '../models/team.model';
import { DailyFantasyPlayersState } from '../state/daily-fantasy-players.state';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

export class DailyFantasyPlayersSelectors {
  @Selector([DailyFantasyPlayersState.getMap])
  static selectPlayerById(map: { [id: string]: Player }): (id: string) => Player {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyPlayersState.getMap])
  static selectPlayerList(map: { [id: string]: Player }): Player[] {
    return Object.values(map);
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPositionsList(players: Player[]): string[] {
    const set = new Set<string>();
    players.map(val => {
      if (val.position) {
        set.add(val.position);
      }
    });
    return Array.from(set);
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList, DailyFantasyTeamsSelectors.selectTeamById])
  static selectPlayerTableRows(playerList: Player[], selectTeamById: (id: string) => Team): PlayerTableRow[] {
    return playerList.map(p => ({
      ...p,
      team: selectTeamById(p?.rgTeamId)?.name,
      salary: null,
      siteId: null,
    }));
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPlayersEmpty(playerList: Player[]): boolean {
    return playerList.length === 0;
  }
}
