import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { BaseballTeamMap } from '../models/baseball-team.model';
import { MlbService } from '../services/mlb.service';
import { FetchFantasyBaseballFreeAgents } from './fantasy-baseball-free-agents.state';
import { PatchFantasyBaseballTeams } from './fantasy-baseball-team.state';

export interface FantasyBaseballLeagueStateModel {
  map: BaseballTeamMap;
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

  @Selector([FantasyBaseballLeagueState])
  static getState(state: FantasyBaseballLeagueStateModel) {
    return state;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static isLoading(state: FantasyBaseballLeagueStateModel) {
    return state.isLoading;
  }

  @Selector([FantasyBaseballLeagueState])
  static statTypeId(state: FantasyBaseballLeagueStateModel) {
    return state.statTypeId;
  }

  @Selector([FantasyBaseballLeagueState])
  static scoringPeriod(state: FantasyBaseballLeagueStateModel) {
    return state.scoringPeriodId;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { getState, patchState, dispatch }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { leagueId } }: FetchBaseballLeague
  ) {
    const state = getState();
    if (state.scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const { scoringPeriodId, teams } = await this.mlbService.baseballLeague(leagueId).toPromise();

    dispatch([new PatchFantasyBaseballTeams({ teams }), new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId })]);

    patchState({ scoringPeriodId });
  }
}
