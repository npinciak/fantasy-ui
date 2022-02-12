import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BaseballPlayer, BaseballPlayerMap } from '../models/baseball-player.model';

export class FetchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] FetchFantasyBaseballFreeAgents`;
  // constructor(public payload: { players: BaseballPlayer[] }) {}
}

export class PatchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] PatchFantasyBaseballFreeAgentss`;
  constructor(public payload: { freeAgents: BaseballPlayer[] }) {}
}

interface FantasyBaseballFreeAgentsStateModel {
  map: BaseballPlayerMap;
}

@State<FantasyBaseballFreeAgentsStateModel>({
  name: 'fantasyBaseballFreeAgents',
  defaults: {
    map: {},
  },
})
@Injectable()
export class FantasyBaseballFreeAgentsState {
  constructor() {}

  @Selector()
  static map(state: FantasyBaseballFreeAgentsStateModel): BaseballPlayerMap {
    return state.map;
  }

  @Action(PatchFantasyBaseballFreeAgents)
  patchTeams(
    { patchState, getState }: StateContext<FantasyBaseballFreeAgentsStateModel>,
    { payload: { freeAgents } }: PatchFantasyBaseballFreeAgents
  ) {
    const state = getState();
    const map = entityMap(freeAgents, p => p.id);

    patchState({ ...state, map });
  }
}
