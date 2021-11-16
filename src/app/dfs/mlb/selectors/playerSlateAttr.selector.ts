import { Selector } from '@ngxs/store';
import { DfsPlayer } from '../class/player.class';
import { DfsSlatePlayer } from '../models/dfsPlayer.interface';
import { SlatePlayerAttr } from '../models/slatePlayer.interface';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { PlayerSelectors } from './player.selector';

export class MlbPlayerSlateAttrSelectors {
  @Selector([MlbDfsState.statLine])
  static selectStatLine(statLine: string): string {
    return statLine;
  }

  @Selector([MlbDfsState.slatePlayers, PlayerSelectors.getPlayerById])
  static slatePlayersToArr(slatePlayers: { [id: number]: SlatePlayerAttr }, selectPlayerById: (id: number) => DfsSlatePlayer): DfsPlayer[] {
    const arr = [];

    for (const [key, val] of Object.entries(slatePlayers)) {
      const masterPlayer = selectPlayerById(Number(key));

      const dfsPlayer = new DfsPlayer(val, masterPlayer);

      arr.push(dfsPlayer);
    }

    return arr;
  }

  @Selector([MlbPlayerSlateAttrSelectors.slatePlayersToArr])
  static batters(players: DfsPlayer[]): DfsPlayer[] {
    return players.filter(player => player.isBatter).sort((a, b) => b.plateIq?.score.overall ?? 0 - a.plateIq?.score.overall ?? 0);
  }

  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static teamOverall(players: DfsPlayer[]): DfsPlayer[] {
    return players.filter(player => player.team);
  }

  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static battersEmpty(players: DfsPlayer[]): boolean {
    return players.length === 0;
  }

  @Selector([MlbPlayerSlateAttrSelectors.slatePlayersToArr])
  static pitchers(players: DfsPlayer[]): DfsPlayer[] {
    return players.filter(player => player.isPitcher).sort((a, b) => b.plateIq?.score.overall ?? 0 - a.plateIq?.score.overall ?? 0);
  }

  @Selector([MlbPlayerSlateAttrSelectors.pitchers])
  static pitchersEmpty(players: DfsPlayer[]): boolean {
    return players.length === 0;
  }
}
