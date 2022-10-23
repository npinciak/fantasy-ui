import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { SlatePlayer } from '../models/player.model';
import { DailyFantasyPlayersState } from '../state/daily-fantasy-players.state';

export class DailyFantasyPlayersSelectors extends GenericSelector(DailyFantasyPlayersState) {
  constructor() {
    super();
  }

  @Selector([DailyFantasyPlayersSelectors.getList])
  static getSlatesEmpty(arr: SlatePlayer[]): boolean {
    return arr.length <= 0;
  }
}
