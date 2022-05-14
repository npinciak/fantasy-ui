import { Observable } from 'rxjs';

export interface GenericEntitiesFacade<T> {
  getMap$: Observable<Record<string, T>>;
  getById$: Observable<(id: string | null) => T | null>;
  addOrUpdate(entities: T[]): Observable<void>;
  clearAndAdd(entities: T[]): Observable<void>;
  clear(): Observable<void>;
  removeIds(ids: string[]): Observable<void>;
  getById(id: string | null): T | null;
}
