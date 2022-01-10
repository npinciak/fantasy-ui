import { Selector } from '@ngxs/store';

import { DfsSlatePlayer, SlatePlayerAttr } from '@app/dfs/models/daily-fantasy-client.model';
import { MlbDfsPlayer } from '../models/mlb-player.model';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { PlayerSelectors } from './player.selector';

export class MlbPlayerSlateAttrSelectors {
  @Selector([MlbDfsState.statLine])
  static selectStatLine(statLine: string): string {
    return statLine;
  }

  @Selector([MlbDfsState.slatePlayers, PlayerSelectors.getPlayerById])
  static slatePlayersToArr(
    slatePlayers: { [id: number]: SlatePlayerAttr },
    selectPlayerById: (id: number) => DfsSlatePlayer
  ): MlbDfsPlayer[] {
    const arr = [];

    for (const [key, val] of Object.entries(slatePlayers)) {
      const masterPlayer = selectPlayerById(Number(key));

      const dfsPlayer = null; // TODO: add transformer new MlbDfsPlayer(val, masterPlayer);

      arr.push(dfsPlayer);
    }

    return arr;
  }

  @Selector([MlbPlayerSlateAttrSelectors.slatePlayersToArr])
  static batters(players: MlbDfsPlayer[]): MlbDfsPlayer[] {
    return players.filter(player => player.isBatter).sort((a, b) => b.plateiq?.score.overall ?? 0 - a.plateiq?.score.overall ?? 0);
  }

  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static teamOverall(players: MlbDfsPlayer[]): MlbDfsPlayer[] {
    return players.filter(player => player.team);
  }

  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static battersEmpty(players: MlbDfsPlayer[]): boolean {
    return players.length === 0;
  }

  @Selector([MlbPlayerSlateAttrSelectors.slatePlayersToArr])
  static pitchers(players: MlbDfsPlayer[]): MlbDfsPlayer[] {
    return players.filter(player => player.isPitcher).sort((a, b) => b.plateiq?.score.overall ?? 0 - a.plateiq?.score.overall ?? 0);
  }

  @Selector([MlbPlayerSlateAttrSelectors.pitchers])
  static pitchersEmpty(players: MlbDfsPlayer[]): boolean {
    return players.length === 0;
  }
}
