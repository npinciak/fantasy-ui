import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NFLClientPlayerAttributes } from '../models/nfl-slate-attr.model';
import { PatchPlayerSlate } from './nfl-dfs-player-slate.actions';

export class NflDfsPlayerSlateStateModel {
  map!: { [id: string]: NFLClientPlayerAttributes };
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
  static getPlayerSlateMap(state: NflDfsPlayerSlateStateModel): { [id: string]: NFLClientPlayerAttributes } {
    return state.map;
  }

  @Action(PatchPlayerSlate)
  async patchPlayerSlate(ctx: StateContext<NflDfsPlayerSlateState>, { dfsPlayers }: PatchPlayerSlate): Promise<void> {}
}
