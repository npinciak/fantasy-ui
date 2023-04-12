import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { EspnClient } from 'sports-ui-sdk';
import { FantasyBaseballPlayerNews } from '../actions/fantasy-baseball-player-news.actions';
import { MlbService } from '../services/mlb.service';

@State({ name: FantasyBaseballPlayerNews.stateName })
@Injectable()
export class FantasyBaseballPlayerNewsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballPlayerNews,
}) {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  @Action(FantasyBaseballPlayerNews.Fetch, { cancelUncompleted: true })
  fetchBaseballPlayerNews(_: StateContext<GenericStateClass<EspnClient.PlayerNewsFeedEntity>>, { payload: { playerId } }) {
    return this.mlbService.baseballPlayerNews(playerId).pipe(
      map(news => {
        this.store.dispatch([new FantasyBaseballPlayerNews.AddOrUpdate(news)]);
      })
    );
  }
}
