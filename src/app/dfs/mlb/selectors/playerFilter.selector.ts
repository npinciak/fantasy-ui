import { Selector } from '@ngxs/store';
import { DfsPlayer } from '../class/player.class';
import { MlbPlayerSlateAttrSelectors } from './playerSlateAttr.selector';

export class PlayerFilterSelectors {
  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static matchupsEmpty(players: DfsPlayer[]): DfsPlayer[] {
    return players;
  }
}
