import { RouterSelector } from '@app/@core/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { PlayerNews, PlayerNewsEntity } from '@app/espn/models/player-news.model';
import { Selector } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk';
import { FantasyFootballPlayerNewsState } from '../state/fantasy-football-player-news.state';

export class FantasyFootballPlayerNewsSelector extends GenericSelector(FantasyFootballPlayerNewsState) {
  @Selector([RouterSelector.getPlayerId, FantasyFootballPlayerNewsSelector.getById])
  static getCurrentPlayerNews(playerId: string | null, getPlayerNewsById: (id: string | null) => PlayerNews | null): PlayerNewsEntity[] {
    if (!exists(playerId)) throw new Error('cannot retrieve player news without valid playerId');
    return getPlayerNewsById(playerId)?.news ?? [];
  }
}
