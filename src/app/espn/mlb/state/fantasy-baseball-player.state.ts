import { Injectable } from '@angular/core';
import { GenericState, GenericStateClass } from '@app/@shared/generic-state/generic.state';
import { EspnClientPlayerNewsFeedEntity } from '@client/espn-client.model';
import { Action, State, StateContext } from '@ngxs/store';
import { MlbService } from '../services/mlb.service';

export class FetchBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] FetchBaseballPlayerNews`;
  constructor(public payload: { lookbackDays: string; playerId: string }) {}
}

export class SetBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] SetBaseballPlayerNews`;
  constructor(public payload: EspnClientPlayerNewsFeedEntity[]) {}
}

export interface FantasyBaseballPlayerStateModel {
  isLoading: boolean;
  map: Record<string, any>;
}

@State({ name: 'fantasyBaseballPlayer' })
@Injectable()
export class FantasyBaseballPlayerState extends GenericState({ idProperty: 'id', addOrUpdate: SetBaseballPlayerNews }) {
  constructor(private mlbService: MlbService) {
    super();
  }

  @Action(FetchBaseballPlayerNews)
  async fetchBaseballPlayerNews(
    { dispatch }: StateContext<GenericStateClass<EspnClientPlayerNewsFeedEntity>>,
    { payload: { lookbackDays, playerId } }: FetchBaseballPlayerNews
  ): Promise<void> {
    const news = await this.mlbService.baseballPlayerNews({ lookbackDays, playerId }).toPromise();
    dispatch([new SetBaseballPlayerNews(news)]);
  }
}
