import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShowFastcastScoreboard } from '../actions/shell.actions';

export interface ShellStateModel {
  showFastcastScoreboard: boolean;
}

@State<ShellStateModel>({
  name: 'shell',
  defaults: {
    showFastcastScoreboard: true,
  },
})
@Injectable()
export class ShellState {
  @Selector()
  static showFastcastScoreboard(state: ShellStateModel): boolean {
    return state.showFastcastScoreboard;
  }

  @Action(ShowFastcastScoreboard)
  showFastcastScoreboard(
    { getState, patchState }: StateContext<ShellStateModel>,
    { payload: { showFastcastScoreboard } }: ShowFastcastScoreboard
  ) {
    const state = getState();
    patchState({ ...state, showFastcastScoreboard });
  }
}
