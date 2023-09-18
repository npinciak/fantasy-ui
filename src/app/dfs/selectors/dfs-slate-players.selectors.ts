import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '../models/player.model';
import { DfsSlatePlayersState } from '../state/dfs-slate-players.state';

export class DfsSlatePlayersSelectors extends GenericSelector(DfsSlatePlayersState) {
  @Selector([DfsSlatePlayersSelectors.getList])
  static getSlatesEmpty(arr: SlatePlayer[]): boolean {
    return arr.length <= 0;
  }
}
