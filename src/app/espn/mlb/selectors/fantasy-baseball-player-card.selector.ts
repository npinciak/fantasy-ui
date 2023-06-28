import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Selector } from '@ngxs/store';
import { BaseballPlayerCard } from '../models/baseball-player.model';
import { FantasyBaseballPlayerCardState } from '../state/fantasy-baseball-player-card.state';

export class FantasyBaseballPlayerCardSelector extends GenericSelector(FantasyBaseballPlayerCardState) {
  @Selector([RouterSelector.getPlayerId, FantasyBaseballPlayerCardSelector.getById])
  static getCurrentPlayerCard(
    playerId: string | null,
    getPlayerCardById: (id: string | null) => BaseballPlayerCard | null
  ): BaseballPlayerCard | null {
    if (!exists(playerId)) throw new Error('cannot retrieve player news without valid playerId');
    return getPlayerCardById(playerId);
  }
}
