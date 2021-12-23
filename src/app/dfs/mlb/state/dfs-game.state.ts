import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DfsGameAction } from './dfs-game.actions';

export class DfsGameStateModel {
  public items: string[];
}

const defaults = {
  items: []
};

@State<DfsGameStateModel>({
  name: 'dfsGame',
  defaults
})
@Injectable()
export class DfsGameState {
  @Action(DfsGameAction)
  add({ getState, setState }: StateContext<DfsGameStateModel>, { payload }: DfsGameAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
