import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators/entities.operators';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { EspnService } from '@espn/espn.service';
import { EventMap, MlbStateModel, TeamMap } from './mlb-state.model';
import { FetchBaseballLeague, UpdateStatType } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { PatchEvents } from './mlb-event.state';
import { PatchTeams } from './baseball-team.state';

@State<MlbStateModel>({
  name: 'mlb',
  defaults: {
    statTypeId: 1,
    scoringPeriodId: null,
    schedule: {},
    teams: {},
    events: {},
    isLoading: true,
  },
})
@Injectable()
export class MlbState {
  constructor(private store: Store, private espnService: EspnService, private mlbService: MlbService) {}

  @Selector()
  static getState(state: MlbStateModel) {
    return state;
  }

  @Selector([MlbState.getState])
  static isLoading(_: MlbStateModel, getState: MlbStateModel) {
    return getState.isLoading;
  }

  @Selector()
  static statTypeId(state: MlbStateModel) {
    return state.statTypeId;
  }

  @Selector()
  static scoringPeriod(state: MlbStateModel) {
    return state.scoringPeriodId;
  }

  @Selector()
  static schedule(state: MlbStateModel) {
    return state.schedule;
  }

  @Selector()
  static teams(state: MlbStateModel): TeamMap {
    return state.teams;
  }

  @Selector()
  static events(state: MlbStateModel): EventMap {
    return state.events;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(ctx: StateContext<MlbStateModel>, { leagueId }: FetchBaseballLeague) {
    if (ctx.getState().scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const league = await this.mlbService.baseballLeague(leagueId).toPromise();
    const events = await this.mlbService.baseballEvents().toPromise();

    this.store.dispatch(new PatchTeams({ teams: league.teams }));
    this.store.dispatch(new PatchEvents({ events }));
  }

  @Action(UpdateStatType)
  update(ctx: StateContext<MlbStateModel>, { statTypeId }: UpdateStatType) {
    return ctx.patchState({ statTypeId });
  }
}
