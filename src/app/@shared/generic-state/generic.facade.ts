import { Observable } from 'rxjs';
import { GenericFacade, GenericSelectorClass } from './generic.model';

export function GenericFacade<T>(selectorClass: GenericSelectorClass<T>): {
  new (...args: any[]): GenericFacade<T>;
} {
  class GenericFacadeBase implements GenericFacade<T> {
    getMap$: Observable<Record<string, T>>;
    getList$: Observable<T[]>;
    getById$: Observable<(id: string | null) => T | null>;
    getIdList$: Observable<string[]>;
    getIdSet$: Observable<Set<string>>;

    patchAction(entities: T[]): Observable<void> {
      throw new Error('Method not implemented.');
    }
    getById(id: string | null): T | null {
      throw new Error('Method not implemented.');
    }
  }
  return GenericFacadeBase;
}
