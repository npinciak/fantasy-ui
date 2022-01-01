import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

import { FetchBaseballLeague, UpdateStatType } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';

export interface FantasyBaseballLeagueStateModel {
  map: { [id: string]: any };
  statTypeId: number;
  isLoading: boolean;
  scoringPeriodId: number;
}

@State<FantasyBaseballLeagueStateModel>({
  name: 'fantasyBaseballLeague',
  defaults: {
    map: {},
    statTypeId: 1,
    scoringPeriodId: null,
    isLoading: true,
  },
})
@Injectable()
export class FantasyBaseballLeagueState {
  constructor(private store: Store, private mlbService: MlbService) {}

  @Selector()
  static getState(state: FantasyBaseballLeagueStateModel) {
    return state;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static isLoading(_: FantasyBaseballLeagueStateModel, getState: FantasyBaseballLeagueStateModel) {
    return getState.isLoading;
  }

  @Selector()
  static statTypeId(state: FantasyBaseballLeagueStateModel) {
    return state.statTypeId;
  }

  @Selector()
  static scoringPeriod(state: FantasyBaseballLeagueStateModel) {
    return state.scoringPeriodId;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(ctx: StateContext<FantasyBaseballLeagueStateModel>, { leagueId }: FetchBaseballLeague) {
    if (ctx.getState().scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const league = await this.mlbService.baseballLeague(leagueId).toPromise();

    // this.store.dispatch(new PatchTeams({ teams: league.teams }));
  }

  @Action(UpdateStatType)
  update(ctx: StateContext<FantasyBaseballLeagueStateModel>, { statTypeId }: UpdateStatType) {
    return ctx.patchState({ statTypeId });
  }
}
