import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { EspnClient } from '@sports-ui/ui-sdk/espn';
import { map } from 'rxjs/operators';

import { FantasyBaseballPlayerNews } from '../actions/fantasy-baseball-player-news.actions';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballPlayerNews.stateName })
@Injectable()
export class FantasyBaseballPlayerNewsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballPlayerNews,
}) {
  constructor(private mlbService: FantasyBaseballService, private store: Store) {
    super();
  }

  @Action(FantasyBaseballPlayerNews.Fetch, { cancelUncompleted: true })
  fetchBaseballPlayerNews(_: StateContext<GenericStateClass<EspnClient.PlayerNewsFeedEntity>>, { payload: { playerId } }) {
    return this.mlbService.baseballPlayerNews(playerId).pipe(
      map(news => {
        this.store.dispatch([new FantasyBaseballPlayerNews.AddOrUpdate([news])]);
      })
    );
  }
}
