import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { EmptyPayloadActionClass, ISelectedStateClass, IdsPayload, IdsPayloadActionClass } from './generic-selected.model';
import { clear, deselect, select, toggle, toggleOff } from './generic-selected.operator';
import { SelectedInitialState, SelectedStateModel } from './generic-selected.state.model';

export function SelectedState({
  selectAction,
  deselectAction,
  toggleAction,
  toggleOffAction,
  clearAction,
}: {
  selectAction: IdsPayloadActionClass;
  deselectAction: IdsPayloadActionClass;
  toggleAction: IdsPayloadActionClass;
  toggleOffAction: IdsPayloadActionClass;
  clearAction: EmptyPayloadActionClass;
}): ISelectedStateClass {
  @State<SelectedStateModel>({
    name: 'selectedStateBase',
    defaults: SelectedInitialState,
  })
  @Injectable()
  class SelectedStateBase {
    public static selectAction = selectAction;
    public static deselectAction = deselectAction;
    public static toggleAction = toggleAction;
    public static toggleOffAction = toggleOffAction;
    public static clearAction = clearAction;

    @Action(selectAction)
    select({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(select(ids));
    }

    @Action(deselectAction)
    deselect({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(deselect(ids));
    }

    @Action(toggleAction)
    toggle({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(toggle(ids));
    }

    @Action(toggleOffAction)
    toggleOff({ setState }: StateContext<SelectedStateModel>, { payload: { ids } }: { payload: IdsPayload }): void {
      setState(toggleOff(ids));
    }

    @Action(clearAction)
    clear({ setState }: StateContext<SelectedStateModel>): void {
      setState(clear());
    }
  }
  return SelectedStateBase;
}
