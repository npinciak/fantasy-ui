import { Injectable, OnDestroy } from '@angular/core';
import { ActionStatus, Actions, NgxsOnInit, State, getActionTypeFromInstance } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { LoadingExecutorFacade } from './loading-executor.facade';
@State({ name: 'loadingExecutorActionHandler' })
@Injectable({ providedIn: 'root' })
export class LoadingExecutorActionHandlerState implements NgxsOnInit, OnDestroy {
  constructor(private actions$: Actions, private loadingExecutorFacade: LoadingExecutorFacade) {}

  private _sub: Subscription = new Subscription();

  ngxsOnInit(): void {
    this._sub = this.actions$.subscribe({
      next: actionContext => {
        const actionType = getActionTypeFromInstance(actionContext.action);

        if (!actionType) return;

        const isRouterAction = /router/g.test(actionType!);
        const isSetActionCountAction = /loadingExecutor/g.test(actionType!);

        if (isRouterAction || isSetActionCountAction) return;

        let count = this.loadingExecutorFacade.getCountByActionType(actionType) || 0;

        if (actionContext.status === ActionStatus.Dispatched) {
          count++;
        } else if (count > 0) {
          count--;
        }

        this.loadingExecutorFacade.setActionCount(actionType, count);
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
