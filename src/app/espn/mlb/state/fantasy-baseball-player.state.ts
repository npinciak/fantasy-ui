import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { EspnClientPlayerNewsFeedEntity } from '@app/espn/espn-client.model';
import { Action, State, StateContext } from '@ngxs/store';
import { MlbService } from '../services/mlb.service';

export class FetchBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] FetchBaseballPlayerNews`;
  constructor(public payload: { lookbackDays: string; playerId: string }) {}
}

export class PatchBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] PatchBaseballPlayerNews`;
  constructor(public payload: EspnClientPlayerNewsFeedEntity[]) {}
}

export interface FantasyBaseballPlayerStateModel {
  isLoading: boolean;
  map: Record<string, any>;
}

@State({ name: 'fantasyBaseballPlayer' })
@Injectable()
export class FantasyBaseballPlayerState extends GenericState({ idProperty: 'id', patchAction: PatchBaseballPlayerNews }) {
  constructor(private mlbService: MlbService) {
    super();
  }

  @Action(FetchBaseballPlayerNews)
  async fetchBaseballPlayerNews(
    { dispatch }: StateContext<FantasyBaseballPlayerStateModel>,
    { payload: { lookbackDays, playerId } }: FetchBaseballPlayerNews
  ): Promise<void> {
    // const news = await this.mlbService.baseballPlayerNews({ lookbackDays, playerId }).toPromise();
    // dispatch([new PatchBaseballPlayerNews(news)]);
  }
}
