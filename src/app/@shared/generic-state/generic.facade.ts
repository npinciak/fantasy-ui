import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GenericFacade, GenericSelectorClass, IGenericActionsClass } from './generic.model';

export function GenericFacade<T, U = Record<string, unknown>>({
  selectorClass,
  actionHandler,
}: {
  selectorClass: GenericSelectorClass<T>;
  actionHandler: IGenericActionsClass<T, U>;
}): {
  new (...args: any[]): GenericFacade<T>;
} {
  @Injectable()
  class GenericFacadeBase implements GenericFacade<T> {
    getMap$: Observable<Record<string, T>>;
    getList$: Observable<T[]>;
    getById$: Observable<(id: string | null) => T | null>;
    getIdList$: Observable<string[]>;
    getIdSet$: Observable<Set<string>>;

    static fetch = actionHandler.Fetch;
    static addOrUpdate = actionHandler.AddOrUpdate;

    constructor(private store: Store) {}

    addOrUpdate(entities: T[]): Observable<void> {
      return this.store.dispatch([new GenericFacadeBase.addOrUpdate(entities)]);
    }

    fetch(): Observable<void> {
      return this.store.dispatch([new GenericFacadeBase.fetch()]);
    }

    getList(): T[] {
      return this.store.selectSnapshot(selectorClass.getList);
    }

    getById(id: string | null): T | null {
      return this.store.selectSnapshot(selectorClass.getById)(id);
    }
  }
  return GenericFacadeBase;
}
