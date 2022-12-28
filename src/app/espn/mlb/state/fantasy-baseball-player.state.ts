import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext } from '@ngxs/store';
import { EspnClient } from 'sports-ui-sdk';
import { MlbService } from '../services/mlb.service';

export class FetchBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] FetchBaseballPlayerNews`;
  constructor(public payload: { lookbackDays: string; playerId: string }) {}
}

export class SetBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] SetBaseballPlayerNews`;
  constructor(public payload: EspnClient.PlayerNewsFeedEntity[]) {}
}

export class ClearAndAddBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] ClearAndAddBaseballPlayerNews`;
  constructor(public payload: EspnClient.PlayerNewsFeedEntity[]) {}
}

export interface FantasyBaseballPlayerStateModel {
  isLoading: boolean;
  map: Record<string, any>;
}

@State({ name: 'fantasyBaseballPlayer' })
@Injectable()
export class FantasyBaseballPlayerState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetBaseballPlayerNews,
  clearAndAdd: ClearAndAddBaseballPlayerNews,
}) {
  constructor(private mlbService: MlbService) {
    super();
  }

  @Action(FetchBaseballPlayerNews)
  async fetchBaseballPlayerNews(
    { dispatch }: StateContext<GenericStateClass<EspnClient.PlayerNewsFeedEntity>>,
    { payload: { lookbackDays, playerId } }: FetchBaseballPlayerNews
  ): Promise<void> {
    const news = await this.mlbService.baseballPlayerNews({ lookbackDays, playerId }).toPromise();
    dispatch([new SetBaseballPlayerNews(news)]);
  }
}
