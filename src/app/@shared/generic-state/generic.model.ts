import { Observable } from 'rxjs';

export interface GenericStateModel<T> {
  map: { [id: string]: T };
}

export interface GenericStateClass<T> {
  new (...args: any[]): any;
  addOrUpdate: GenericPayloadActionClass<T>;
  clearAndAdd: GenericPayloadActionClass<T>;
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

export interface GenericSelectorClass<T> {
  new (...args: any[]): any;
  stateClass: GenericStateClass<T>;
  getMap(state: GenericStateModel<T>): Record<string, T>;
  getById(map: Record<string, T>): (id: string | null) => T | null;
  getList(map: Record<string, T>): T[];
  getIdList(map: Record<string, T>): string[];
  getIdSet(list: string[]): Set<string>;
}

export interface IGenericActionsClass<T, U> {
  new (...args: any[]): any;
  stateName: string;
  AddOrUpdate: GenericPayloadActionClass<T>;
  ClearAndAdd: GenericPayloadActionClass<T>;
  Fetch: GenericPayloadFetchActionClass<U>;
}

export interface GenericPayloadActionClass<T> {
  type: string;
  new (payload: T[]): { payload: T[] };
}

export interface GenericPayloadClearActionClass {
  type: string;
  new (): unknown;
}

export interface GenericPayloadFetchActionClass<T> {
  type: string;
  new (payload: T): { payload: T };
}
