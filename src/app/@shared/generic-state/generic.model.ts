import { Observable } from 'rxjs';

export interface GenericStateModel<T> {
  map: { [id: string]: T };
}

export interface GenericFacade<T> {
  getMap$: Observable<Record<string, T>>;
  getList$: Observable<T[]>;
  getById$: Observable<(id: string | null) => T | null>;
  getIdList$: Observable<string[]>;
  getIdSet$: Observable<Set<string>>;
  patchAction(entities: T[]): Observable<void>;
  getById(id: string | null): T | null;
}
