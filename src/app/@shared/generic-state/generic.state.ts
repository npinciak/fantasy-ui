import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patchMap } from '../operators';
import { GenericPayloadActionClass } from './generic.actions';
import { GenericStateModel } from './generic.model';

export interface GenericStateClass<T> {
  new (...args: any[]): any;
  addOrUpdate: GenericPayloadActionClass<T>;
<<<<<<< Updated upstream
  // clearAndAdd: GenericPayloadActionClass<T>;
  // clear: GenericPayloadActionClass<T>;
=======
  clearAndAdd: GenericPayloadActionClass<T>;
>>>>>>> Stashed changes
}

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string | number>>({
  idProperty,
  addOrUpdate,
  clearAndAdd,
}: {
  idProperty: IdProperty;
  addOrUpdate: GenericPayloadActionClass<EntityType>;
  clearAndAdd: GenericPayloadActionClass<EntityType>;
}): GenericStateClass<EntityType> {
  @State<GenericStateModel<EntityType>>({
    name: 'genericStateBase',
    defaults: {
      map: {},
    },
  })
  @Injectable()
  class GenericStateBase {
    static addOrUpdate = addOrUpdate;
    // static clearAndAdd = clearAndAdd;
    // static clear = clear;

    private static getId = (t: EntityType) => t[idProperty] as unknown as string;

    constructor() {}

    @Action(addOrUpdate)
    addOrUpdate({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }

    // @Action(clearAndAdd)
    // clearAndAdd({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
    //   setState(setMap(payload, GenericStateBase.getId));
    // }

    // @Action(clear)
    // clear({ setState }: StateContext<GenericStateModel<EntityType>>): void {
    //   setState(clearMap());
    // }
  }
  return GenericStateBase;
}
