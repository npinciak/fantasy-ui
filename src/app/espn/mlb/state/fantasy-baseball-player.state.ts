import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MlbService } from '../services/mlb.service';

export class FetchBaseballPlayerNews {
  static readonly type = `[fantasyBaseballPlayer] FetchBaseballPlayerNews`;
  constructor(public payload: { lookbackDays: string; playerId: string }) {}
}

export interface FantasyBaseballPlayerStateModel {
  isLoading: boolean;
  map: Record<string, any>;
}

@State<FantasyBaseballPlayerStateModel>({
  name: 'fantasyBaseballPlayer',
  defaults: {
    isLoading: true,
    map: {},
  },
})
@Injectable()
export class FantasyBaseballPlayerState {
  constructor(private mlbService: MlbService) {}

  @Selector([FantasyBaseballPlayerState])
  static getState(state: FantasyBaseballPlayerStateModel) {
    return state;
  }

  @Selector([FantasyBaseballPlayerState.getState])
  static isLoading(state: FantasyBaseballPlayerStateModel) {
    return state.isLoading;
  }

  @Selector([FantasyBaseballPlayerState.getState])
  static scoringPeriod(state: FantasyBaseballPlayerStateModel) {
    return state;
  }

  @Action(FetchBaseballPlayerNews)
  async fetchBaseballPlayerNews(
    { getState, patchState, dispatch }: StateContext<FantasyBaseballPlayerStateModel>,
    { payload: { lookbackDays, playerId } }: FetchBaseballPlayerNews
  ): Promise<void> {
    const news = await this.mlbService.baseballPlayerNews({ lookbackDays, playerId }).toPromise();

    console.log(news);
    // const { scoringPeriodId, teams } = await this.mlbService.espnFantasyPlayerNewsBySport;
    // dispatch([new PatchFantasyBaseballTeams({ teams }), new FetchFantasyBaseballFreeAgents({ PlayerId, scoringPeriodId })]);
    // patchState({ scoringPeriodId });
  }
}
