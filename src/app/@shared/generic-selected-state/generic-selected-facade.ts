import { Injectable } from '@angular/core';
import { ActionCompletion, Actions, ofActionCompleted, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { select } from '../models/typed-select';
import { ISelectedFacade, ISelectedSelectorClass } from './generic-selected.model';

export function SelectedFacade(selectorClass: ISelectedSelectorClass): { new (...args: any[]): ISelectedFacade } {
  @Injectable()
  class SelectedFacadeBase {
    selectedIds$ = select(selectorClass.getSelectedIds);
    selectedIdsSet$ = select(selectorClass.getSelectedIdsSet);
    selectedLength$ = select(selectorClass.getSelectedIdsLength);
    toggledIds$ = select(selectorClass.getToggledIds);
    toggledIdsSet$ = select(selectorClass.getToggledIdsSet);
    isSelected$ = select(selectorClass.isIdSelected);
    isToggled$ = select(selectorClass.isIdToggled);

    constructor(public store: Store, public actions$: Actions) {}

    select(ids: string[]): Observable<void> {
      return this.store.dispatch(new selectorClass.stateClass.selectAction({ ids }));
    }

    deselect(ids: string[]): Observable<void> {
      return this.store.dispatch(new selectorClass.stateClass.deselectAction({ ids }));
    }

    toggle(ids: string[]): Observable<void> {
      return this.store.dispatch(new selectorClass.stateClass.toggleAction({ ids }));
    }

    toggleOff(ids: string[]): Observable<void> {
      return this.store.dispatch(new selectorClass.stateClass.toggleOffAction({ ids }));
    }

    clear(): Observable<void> {
      return this.store.dispatch(new selectorClass.stateClass.clearAction());
    }

    isSelected(id: string): boolean {
      return this.store.selectSnapshot(selectorClass.isIdSelected)(id);
    }

    isToggled(id: string): boolean {
      return this.store.selectSnapshot(selectorClass.isIdToggled)(id);
    }

    getSelectedIds(): string[] {
      return this.store.selectSnapshot(selectorClass.getSelectedIds);
    }

    getSelectedIdsSet(): Set<string> {
      return this.store.selectSnapshot(selectorClass.getSelectedIdsSet);
    }

    getToggledIds(): string[] {
      return this.store.selectSnapshot(selectorClass.getToggledIds);
    }

    getToggledIdsSet(): Set<string> {
      return this.store.selectSnapshot(selectorClass.getToggledIdsSet);
    }

    onSelectedIdsChanged(): Observable<ActionCompletion> {
      return this.actions$.pipe(
        ofActionCompleted(
          selectorClass.stateClass.selectAction,
          selectorClass.stateClass.toggleAction,
          selectorClass.stateClass.deselectAction,
          selectorClass.stateClass.toggleOffAction,
          selectorClass.stateClass.clearAction
        )
      );
    }

    onToggle(): Observable<ActionCompletion> {
      return this.actions$.pipe(ofActionCompleted(selectorClass.stateClass.toggleAction));
    }
  }
  return SelectedFacadeBase;
}
