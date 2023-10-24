import { Selector } from '@app/@shared/models/typed-selector';
import { DfsNflSlateDetailsActions } from '@app/dfs/nfl/actions/dfs-nfl-slate-details.actions';
import { ActionType, createPropertySelectors, createSelector, getActionTypeFromInstance } from '@ngxs/store';
import { LoadingExecutorState, LoadingExecutorStateModel } from './loading-executor.state';

export class LoadingExecutorSelector {
  static slices = createPropertySelectors<LoadingExecutorStateModel>(LoadingExecutorState);

  @Selector([LoadingExecutorState])
  static getState(state: LoadingExecutorStateModel): LoadingExecutorStateModel {
    return state;
  }

  @Selector([LoadingExecutorSelector.getState])
  static getCountByActionType(state: LoadingExecutorStateModel): (actionType: string | undefined) => number {
    return (actionType: string | undefined) => {
      if (!actionType) return 0;

      return state[actionType] || 0;
    };
  }

  @Selector([LoadingExecutorSelector.getState])
  static hasActionsExecuting(state: LoadingExecutorStateModel): (actionTypes?: ActionType[]) => boolean {
    return (actionTypes?: ActionType[]) => {
      const result = actionsExecutingFn(actionTypes!, state);
      return result == null ? false : Object.values(result).some(value => value > 0);
    };
  }

  @Selector([LoadingExecutorSelector.hasActionsExecuting])
  static isDfsNflSlateDetailsActionsFetchExecuting(hasActionsExecuting: (actionTypes?: ActionType[]) => boolean): boolean {
    return hasActionsExecuting([DfsNflSlateDetailsActions.Fetch]);
  }
}

export type ActionsExecuting = { [action: string]: number } | null;

function actionsExecutingFn(actionTypes: ActionType[], state: LoadingExecutorStateModel): ActionsExecuting {
  if (!actionTypes || actionTypes.length === 0) {
    if (Object.keys(state).length === 0) {
      return null;
    }
    return state;
  }

  return actionTypes.reduce((acc: ActionsExecuting, type: ActionType) => {
    const actionType = getActionTypeFromInstance(type);

    if (!actionType) {
      return acc;
    }

    if (state[actionType]) {
      return { ...acc, [actionType]: state[actionType] };
    }

    return acc;
  }, null);
}

export function actionsExecuting(actionTypes?: ActionType[]): (state: LoadingExecutorStateModel) => ActionsExecuting {
  return createSelector([LoadingExecutorState], (state: LoadingExecutorStateModel): ActionsExecuting => {
    return actionsExecutingFn(actionTypes!, state);
  });
}

export function hasActionsExecuting(actionTypes?: ActionType[]): (state: LoadingExecutorStateModel) => boolean {
  return createSelector([LoadingExecutorState], (state: LoadingExecutorStateModel): boolean => {
    const result = actionsExecutingFn(actionTypes!, state);
    return result === null ? false : Object.values(result).some(value => value > 0);
  });
}
