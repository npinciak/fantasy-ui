import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { SetActionCount } from './loading-executer.actions';
import { LoadingExecutorSelector } from './loading-executor.selector';
import { LoadingExecutorStateModel } from './loading-executor.state';

@Injectable({ providedIn: 'root' })
export class LoadingExecutorFacade {
  isDfsNflSlateDetailsActionsFetchExecuting$ = select(LoadingExecutorSelector.isDfsNflSlateDetailsActionsFetchExecuting);

  get getCountByActionType(): (actionType: string | undefined) => number {
    return this.store.selectSnapshot(LoadingExecutorSelector.getCountByActionType);
  }

  get getState(): LoadingExecutorStateModel {
    return this.store.selectSnapshot(LoadingExecutorSelector.getState);
  }

  constructor(private store: Store) {}

  setActionCount(actionType: string, count: number) {
    return this.store.dispatch(new SetActionCount({ actionType, count }));
  }
}
