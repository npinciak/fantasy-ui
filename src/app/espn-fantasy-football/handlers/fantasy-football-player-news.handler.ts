import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { EspnClient } from '@sports-ui/ui-sdk';
import { firstValueFrom } from 'rxjs';
import { FantasyFootballPlayerNews } from '../actions/fantasy-football-player-news.actions';
import { FantasyFootballPlayerNewsFacade } from '../facade/fantasy-football-player-news.facade';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballPlayerNews.stateName + 'ActionHandler' })
@Injectable()
export class FantasyBaseballPlayerNewsActionHandler {
  constructor(
    private fantasyfootballService: FantasyFootballService,
    private fantasyFootballPlayerNewsFacade: FantasyFootballPlayerNewsFacade
  ) {}

  @Action(FantasyFootballPlayerNews.Fetch)
  async fetchPlayerNews(_: StateContext<GenericStateModel<EspnClient.PlayerNewsFeedEntity>>, { payload: { playerId } }) {
    try {
      const news = await firstValueFrom(this.fantasyfootballService.fetchPlayerNews(playerId));
      this.fantasyFootballPlayerNewsFacade.addOrUpdate([news]);
    } catch (error) {}
  }
}
