import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import {
  DeselectFastcastEvent,
  SelectFastcastEvent,
  ToggleOffFastcastEvent,
  ToggleOnFastcastEvent,
} from '../actions/espn-fastcast-event-toggle.actions';

export interface EspnFastcastEventToggleStateModel {
  ids: { [id: string]: boolean };
}

@State<EspnFastcastEventToggleStateModel>({
  name: 'espnFastcastEventToggle',
  defaults: {
    ids: {},
  },
})
@Injectable()
export class EspnFastcastEventToggleState {
  constructor() {}

  @Action(SelectFastcastEvent)
  selectFastcastEvent({ setState }: StateContext<EspnFastcastEventToggleStateModel>, { payload: { ids } }: SelectFastcastEvent): void {
    setState(select(ids));
  }

  @Action(DeselectFastcastEvent)
  deselectFastcastEvent({ setState }: StateContext<EspnFastcastEventToggleStateModel>, { payload: { ids } }: DeselectFastcastEvent): void {
    setState(deselect(ids));
  }

  @Action(ToggleOnFastcastEvent)
  toggleOnFastcastEvent({ setState }: StateContext<EspnFastcastEventToggleStateModel>, { payload: { ids } }: ToggleOnFastcastEvent): void {
    setState(toggle(ids));
  }

  @Action(ToggleOffFastcastEvent)
  toggleOffFastcastEvent(
    { setState }: StateContext<EspnFastcastEventToggleStateModel>,
    { payload: { ids } }: ToggleOffFastcastEvent
  ): void {
    setState(toggleOff(ids));
  }
}

export function clear(): StateOperator<EspnFastcastEventToggleStateModel> {
  return patch<EspnFastcastEventToggleStateModel>({
    ids: {},
  });
}

export function deselect(idsToDeselect: (string | number)[]): StateOperator<EspnFastcastEventToggleStateModel> {
  return (state: Readonly<EspnFastcastEventToggleStateModel>) => {
    const previous = state.ids;
    const blacklist = idsToDeselect.reduce((acc, id) => {
      acc[id] = id;
      return acc;
    }, {});
    const ids = Object.keys(state.ids).reduce((acc, id) => {
      if (id in blacklist) {
        return acc;
      }
      acc[id] = previous[id];
      return acc;
    }, {});

    return { ...state, ids };
  };
}

export function toggle(idsToToggle: (string | number)[]): StateOperator<EspnFastcastEventToggleStateModel> {
  return (state: Readonly<EspnFastcastEventToggleStateModel>) => {
    const ids = idsToToggle.reduce(
      (acc, id) => {
        acc[id] = !acc[id];
        return acc;
      },
      { ...state.ids }
    );

    return { ...state, ids };
  };
}

export function toggleOff(idsToToggleOff: (string | number)[]): StateOperator<EspnFastcastEventToggleStateModel> {
  return (state: Readonly<EspnFastcastEventToggleStateModel>) => {
    const { ids } = state;
    const existingToToggleOff = idsToToggleOff.filter(id => id in ids);
    const toggledOff = existingToToggleOff.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {});
    const newIds = { ...ids, ...toggledOff };
    return { ids: newIds };
  };
}

export function select(idsToSelect: (string | number)[]): StateOperator<EspnFastcastEventToggleStateModel> {
  return (state: Readonly<EspnFastcastEventToggleStateModel>) => {
    const ids = idsToSelect.reduce(
      (acc, id) => {
        acc[id] = true;
        return acc;
      },
      { ...state.ids }
    );

    return { ...state, ids };
  };
}
