import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { setMap } from '@app/@shared/operators';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';
import { FantasyFootballPlayerNews } from '../actions/fantasy-football-player-news.actions';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballPlayerNews.stateName })
@Injectable()
export class FantasyFootballPlayerNewsState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyFootballPlayerNews.AddOrUpdate,
  clearAndAdd: FantasyFootballPlayerNews.ClearAndAdd,
}) {
  constructor(private store: Store, private fantasyfootballService: FantasyFootballService) {
    super();
  }

  private static getId = (t: EspnClient.PlayerNewsFeedEntity) => t.id as unknown as string;

  @Action(FantasyFootballPlayerNews.Fetch)
  async fetchPlayerNews({ setState }: StateContext<GenericStateModel<EspnClient.PlayerNewsFeedEntity>>, { payload: { playerId } }) {
    const news = await this.fantasyfootballService.fetchPlayerNews(playerId).toPromise();
    setState(setMap(news, FantasyFootballPlayerNewsState.getId));
  }
}
