import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BaseballPlayer, BaseballPlayerMap } from '../models/baseball-player.model';
import { MlbService } from '../services/mlb.service';

export class PatchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] PatchFantasyBaseballFreeAgents`;
  constructor(public payload: { freeAgents: BaseballPlayer[] }) {}
}

export class FetchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] FetchFantasyBaseballFreeAgents`;
  constructor(public payload: { leagueId; scoringPeriodId }) {}
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
  constructor(private mlbService: MlbService) {}

  @Selector([FantasyBaseballFreeAgentsState])
  static map(state: FantasyBaseballFreeAgentsStateModel): BaseballPlayerMap {
    return state.map;
  }

  @Action(FetchFantasyBaseballFreeAgents)
  async fetchFantasyBaseballFreeAgents(
    { dispatch, getState }: StateContext<FantasyBaseballFreeAgentsStateModel>,
    { payload: { leagueId, scoringPeriodId } }: FetchFantasyBaseballFreeAgents
  ): Promise<void> {
    const freeAgents = await this.mlbService.baseballFreeAgents({ leagueId, scoringPeriodId }).toPromise();

    dispatch([new PatchFantasyBaseballFreeAgents({ freeAgents })]);
  }

  @Action(PatchFantasyBaseballFreeAgents)
  patchFantasyBaseballFreeAgents(
    { patchState, getState }: StateContext<FantasyBaseballFreeAgentsStateModel>,
    { payload: { freeAgents } }: PatchFantasyBaseballFreeAgents
  ): void {
    const state = getState();
    const map = entityMap(freeAgents, p => p.id);

    patchState({ ...state, map });
  }
}
