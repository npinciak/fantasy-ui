import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NFLClientPlayerAttributesMap } from '../models/nfl-client.model';
import { PatchPlayerSlate } from './nfl-dfs-player-slate.actions';

export class NflDfsPlayerSlateStateModel {
  map!: NFLClientPlayerAttributesMap;
}

const defaults = {
  map: {},
};

@State<NflDfsPlayerSlateStateModel>({
  name: 'nflDfsPlayerSlate',
  defaults,
})
@Injectable()
export class NflDfsPlayerSlateState {
  @Selector([NflDfsPlayerSlateState])
  static getPlayerSlateMap(state: NflDfsPlayerSlateStateModel): NFLClientPlayerAttributesMap {
    return state.map;
  }

  @Action(PatchPlayerSlate)
  async patchPlayerSlate(ctx: StateContext<NflDfsPlayerSlateState>, { dfsPlayers }: PatchPlayerSlate): Promise<void> {}
}
