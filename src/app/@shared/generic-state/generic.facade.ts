import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { select } from '../models/typed-select';
import { GenericSelectorClass, IGenericActionsClass, IGenericFacade } from './generic.model';

export function GenericFacade<T, U = Record<string, unknown>>({
  selectorClass,
  actionHandler,
}: {
  selectorClass: GenericSelectorClass<T>;
  actionHandler: IGenericActionsClass<T, U>;
}): {
  new (...args: any[]): IGenericFacade<T>;
} {
  @Injectable()
  class GenericFacadeBaseClass {
    getMap$: Observable<Record<string, T>> = select(selectorClass.getMap);
    getList$: Observable<T[]> = select(selectorClass.getList);
    getListLength$: Observable<number> = select(selectorClass.getListLength);
    getById$: Observable<(id: string | null) => T | null> = select(selectorClass.getById);
    getIdList$: Observable<string[]> = select(selectorClass.getIdList);
    getIdSet$: Observable<Set<string>> = select(selectorClass.getIdSet);

    static fetch = actionHandler.Fetch;
    static addOrUpdate = actionHandler.AddOrUpdate;

    constructor(private store: Store) {}

    addOrUpdate(entities: T[]): Observable<void> {
      return this.store.dispatch([new GenericFacadeBaseClass.addOrUpdate(entities)]);
    }

    fetch(): Observable<void> {
      return this.store.dispatch([new GenericFacadeBaseClass.fetch()]);
    }

    getList(): T[] {
      return this.store.selectSnapshot(selectorClass.getList);
    }

    getListLength(): number {
      return this.store.selectSnapshot(selectorClass.getListLength);
    }

    getById(id: string | null): T | null {
      return this.store.selectSnapshot(selectorClass.getById)(id);
    }

    clear(): Observable<void> {
      return this.store.dispatch([new actionHandler.Clear()]);
    }
  }
  return GenericFacadeBaseClass;
}
