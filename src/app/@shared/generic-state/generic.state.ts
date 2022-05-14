import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patchMap } from '../operators';

export interface GenericStateClass<T> {
  new (...args: any[]): any;
  getMap(state: GenericStateModel<T>): Record<string, T>;
  patchAction: GenericPayloadActionClass<T>;
}

export interface GenericPayloadActionClass<T> {
  type: string;
  new (payload: T[]): { payload: T[] };
}

export interface GenericStateModel<T> {
  map: { [id: string]: T };
}
export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string>>({
  name,
  idProperty,
  patchAction,
}: {
  name: string;
  idProperty: IdProperty;
  patchAction: GenericPayloadActionClass<EntityType>;
}): GenericStateClass<EntityType> {
  @State<GenericStateModel<EntityType>>({
    name: name,
    defaults: {
      map: {},
    },
  })
  @Injectable()
  class GenericStateBase {
    static patchAction = patchAction;

    private static getId = (t: EntityType) => t[idProperty] as unknown as string;

    // @Selector([GenericStateBase])
    // static getState(state: GenericStateModel<EntityType>): GenericStateModel<EntityType> {
    //   return state;
    // }

    @Selector()
    static getMap(state: GenericStateModel<EntityType>): { [id: string]: EntityType } {
      return state.map;
    }

    constructor() {}

    @Action(patchAction)
    patchAction({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }
  }
  return GenericStateBase;
}
