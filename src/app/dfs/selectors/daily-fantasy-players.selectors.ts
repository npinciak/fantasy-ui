import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '../models/player.model';
import { DfsSlatePlayersState } from '../state/dfs-players.state';

export class DailyFantasyPlayersSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DailyFantasyPlayersSelectors.getList])
  static getSlatesEmpty(arr: SlatePlayer[]): boolean {
    return arr.length <= 0;
  }
}
