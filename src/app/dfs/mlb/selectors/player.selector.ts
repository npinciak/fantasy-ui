import { Selector } from '@ngxs/store';

import { DfsSlatePlayer } from '@app/dfs/models/daily-fantasy-client.model';
import { MlbDfsState } from '../state/mlb-dfs.state';

export class PlayerSelectors {
  @Selector([MlbDfsState.masterPlayers])
  static getPlayers(players: { [id: number]: DfsSlatePlayer }): DfsSlatePlayer[] {
    return Object.values(players);
  }

  @Selector([MlbDfsState.masterPlayers])
  static getPlayerById(players: { [id: number]: DfsSlatePlayer }): (id: number) => DfsSlatePlayer {
    return (id: number) => players[id];
  }
}
