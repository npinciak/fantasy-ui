import { Injectable, OnDestroy } from '@angular/core';
import { ActionStatus, Actions, NgxsOnInit, State, StateContext, getActionTypeFromInstance } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingExecutorFacade } from './loading-executor.facade';

@Injectable({ providedIn: 'root' })
@State({ name: 'loadingExecutorActionHandler' })
export class LoadingExecutorActionHandlerState implements NgxsOnInit, OnDestroy {
  constructor(private actions$: Actions, private loadingExecutorFacade: LoadingExecutorFacade) {}

  private _sub: Subscription = new Subscription();

  ngxsOnInit(): void {
    this._sub = this.actions$
      .pipe(
        tap(actionContext => {
          const actionType = getActionTypeFromInstance(actionContext.action);

          if (actionType === '[router] SetRouterState') return;

          if (!actionType) return;

          let count = this.loadingExecutorFacade.getCountByActionType(actionType) || 0;

          if (actionContext.status === ActionStatus.Dispatched) {
            count++;
          } else if (count > 0) {
            count--;
          }

          this.loadingExecutorFacade.setActionCount(actionType, count);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
