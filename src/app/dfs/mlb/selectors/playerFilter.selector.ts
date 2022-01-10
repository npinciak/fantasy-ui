import { Selector } from '@ngxs/store';

import { MlbDfsPlayer } from '../models/mlb-player.model';
import { MlbPlayerSlateAttrSelectors } from './playerSlateAttr.selector';

export class PlayerFilterSelectors {
  @Selector([MlbPlayerSlateAttrSelectors.batters])
  static matchupsEmpty(players: MlbDfsPlayer[]): MlbDfsPlayer[] {
    return players;
  }
}
