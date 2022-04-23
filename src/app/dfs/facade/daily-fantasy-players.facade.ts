import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayerTableData } from '../models/player.model';
import { DailyFantasyPlayersSelectors } from '../selectors/daily-fantasy-players.selectors';
import { FetchPlayers } from '../state/daily-fantasy-players.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyPlayersFacade {
  @Select(DailyFantasyPlayersSelectors.selectPositionsList) positionList$: Observable<string[]>;
  @Select(DailyFantasyPlayersSelectors.selectTeamList) teamList$: Observable<string[]>;

  /**
   * move to DailyFantasySlateAttrFacade
   */
  @Select(DailyFantasyPlayersSelectors.nbaScatterChartData) nbaScatterChartData$: Observable<any>;
  /**
   * move to DailyFantasySlateAttrFacade
   */
  @Select(DailyFantasyPlayersSelectors.filterableNbaAttributes) filterableNbaAttributes$: Observable<string[]>;

  @Select(DailyFantasyPlayersSelectors.selectNbaPlayerTableRows) selectNbaPlayerTableRows$: Observable<PlayerTableData[]>;
  @Select(DailyFantasyPlayersSelectors.selectNflPlayerTableRows) selectNflPlayerTableRows$: Observable<unknown[]>;

  @Select(DailyFantasyPlayersSelectors.selectPlayersEmpty) playersEmpty$: Observable<boolean>;

  constructor(private store: Store) {}

  fetchPlayers(slatePath: string): Observable<unknown> {
    return this.store.dispatch(new FetchPlayers({ slatePath }));
  }
}
