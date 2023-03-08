import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GenericFacade, GenericSelectorClass, IGenericActionsClass } from './generic.model';

export function GenericFacade<T, U = Record<string, unknown>>(
  selectorClass: GenericSelectorClass<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actionHandler?: IGenericActionsClass<T, U>
): {
  new (...args: any[]): GenericFacade<T>;
} {
  class GenericFacadeBase implements GenericFacade<T> {
    getMap$: Observable<Record<string, T>>;
    getList$: Observable<T[]>;
    getById$: Observable<(id: string | null) => T | null>;
    getIdList$: Observable<string[]>;
    getIdSet$: Observable<Set<string>>;

    constructor(private store: Store) {}

    addOrUpdate(entities: T[]): Observable<void> {
      throw new Error('Method not implemented.');
    }

    clearAndAdd(entities: T[]): Observable<void> {
      throw new Error('Method not implemented.');
    }

    fetch(): Observable<void> {
      throw new Error('Method not implemented.');
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
