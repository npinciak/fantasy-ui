import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';
import { FantasyFootballPlayerNews } from '../actions/fantasy-football-player-news.actions';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballPlayerNews.stateName })
@Injectable()
export class FantasyFootballPlayerNewsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballPlayerNews,
}) {
  constructor(private store: Store, private fantasyfootballService: FantasyFootballService) {
    super();
  }

  @Action(FantasyFootballPlayerNews.Fetch, { cancelUncompleted: true })
  fetchPlayerNews(_: StateContext<GenericStateModel<EspnClient.PlayerNewsFeedEntity>>, { payload: { playerId } }) {
    return this.fantasyfootballService
      .fetchPlayerNews(playerId)
      .pipe(map(news => this.store.dispatch(new FantasyFootballPlayerNews.ClearAndAdd(news))));
  }
}
