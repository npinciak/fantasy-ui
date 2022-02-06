import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FetchBaseballLeague, UpdateStatType } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { PatchFantasyBaseballTeams } from './fantasy-baseball-team.state';

export interface FantasyBaseballLeagueStateModel {
  map: { [id: string]: unknown };
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
  async baseballLeague(
    { getState, dispatch }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { leagueId } }: FetchBaseballLeague
  ) {
    if (getState().scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const { teams } = await this.mlbService.baseballLeague(leagueId).toPromise();

    dispatch([new PatchFantasyBaseballTeams({ teams })]);
  }

  @Action(UpdateStatType)
  update({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { statTypeId }: UpdateStatType) {
    patchState({ statTypeId });
  }
}
