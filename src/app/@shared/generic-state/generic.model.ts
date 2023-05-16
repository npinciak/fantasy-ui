import { PropertySelectors } from '@ngxs/store';
import { Observable } from 'rxjs';

export interface GenericStateModel<T> {
  map: { [id: string]: T };
}

export interface GenericStateClass<T> {
  addOrUpdate: GenericPayloadActionClass<T>;
  new (...args: any[]): any;
}

export interface GenericFacade<T> {
  getMap$: Observable<Record<string, T>>;
  getList$: Observable<T[]>;
  getById$: Observable<(id: string | null) => T | null>;
  getIdList$: Observable<string[]>;
  getIdSet$: Observable<Set<string>>;
  addOrUpdate(entities: T[]): Observable<void>;
  fetch(): Observable<void>;
  getById(id: string | null): T | null;
  getList(): T[];
}

export interface GenericSelectorClass<T> {
  stateClass: GenericStateClass<T>;
  new (...args: any[]): any;
  slices: PropertySelectors<GenericStateModel<T>>;
  getMap(state: GenericStateModel<T>): Record<string, T>;
  getById(map: Record<string, T>): (id: string | null) => T | null;
  getList(map: Record<string, T>): T[];
  getIdList(map: Record<string, T>): string[];
  getIdSet(list: string[]): Set<string>;
}

export interface IGenericActionsClass<T, U> {
  stateName: string;
  AddOrUpdate: GenericPayloadActionClass<T>;
  Fetch: GenericPayloadFetchActionClass<U>;
  new (...args: any[]): any;
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
  new (payload?: T): { payload?: T };
}
