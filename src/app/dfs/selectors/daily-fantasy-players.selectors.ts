import { Selector } from '@ngxs/store';
import { of } from 'rxjs';

import { Player } from '../models/player.model';
import { DailyFantasyPlayersState } from '../state/daily-fantasy-players.state';

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
  static selectPlayerTableRows(playerList: Player[]) {
    return [];
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPlayersEmpty(playerList: Player[]): boolean {
    return false;
  }
}
