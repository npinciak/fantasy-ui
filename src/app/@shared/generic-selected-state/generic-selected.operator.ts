import { StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { SelectedStateModel } from './generic-selected.state.model';

export function clear(): StateOperator<SelectedStateModel> {
  return patch<SelectedStateModel>({
    ids: {},
  });
}

export function deselect(idsToDeselect: (string | number)[]): StateOperator<SelectedStateModel> {
  return (state: Readonly<SelectedStateModel>) => {
    const blacklist = idsToDeselect.reduce((acc, id) => {
      acc[id] = id;
      return acc;
    }, {} as Record<string | number, string | number>);
    const ids = Object.entries(state.ids).reduce((acc, [id, value]) => {
      if (id in blacklist) {
        return acc;
      }
      acc[id] = value;
      return acc;
    }, {} as Record<string | number, boolean>);

    return { ...state, ids };
  };
}

export function toggle(idsToToggle: (string | number)[]): StateOperator<SelectedStateModel> {
  return (state: Readonly<SelectedStateModel>) => {
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

export function toggleOff(idsToToggleOff: (string | number)[]): StateOperator<SelectedStateModel> {
  return (state: Readonly<SelectedStateModel>) => {
    const { ids } = state;
    const existingToToggleOff = idsToToggleOff.filter(id => id in ids);
    const toggledOff = existingToToggleOff.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {} as Record<string | number, boolean>);
    const newIds = { ...ids, ...toggledOff };
    return { ids: newIds };
  };
}

export function select(idsToSelect: (string | number)[]): StateOperator<SelectedStateModel> {
  return (state: Readonly<SelectedStateModel>) => {
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
