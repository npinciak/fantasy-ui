import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ISelectedActionClass, ISelectedStateClass, IdsPayload } from './generic-selected.model';
import { clear, deselect, select, toggle, toggleOff } from './generic-selected.operator';
import { SelectedInitialState, SelectedStateModel } from './generic-selected.state.model';

export function SelectedState({ selectedActions }: { selectedActions: ISelectedActionClass }): ISelectedStateClass {
  @State<SelectedStateModel>({
    name: 'selectedStateBase',
    defaults: SelectedInitialState,
  })
  @Injectable()
  class SelectedStateBase {
    public static selectAction = selectedActions.selectAction;
    public static deselectAction = selectedActions.deselectAction;
    public static toggleAction = selectedActions.toggleAction;
    public static toggleOffAction = selectedActions.toggleOffAction;
    public static clearAction = selectedActions.clearAction;

    @Action(SelectedStateBase.selectAction)
    select({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(select(ids));
    }

    @Action(SelectedStateBase.deselectAction)
    deselect({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(deselect(ids));
    }

    @Action(SelectedStateBase.toggleAction)
    toggle({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(toggle(ids));
    }

    @Action(SelectedStateBase.toggleOffAction)
    toggleOff({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(toggleOff(ids));
    }

    @Action(SelectedStateBase.clearAction)
    clear({ setState }: StateContext<SelectedStateModel>): void {
      setState(clear());
    }
  }
  return SelectedStateBase;
}
