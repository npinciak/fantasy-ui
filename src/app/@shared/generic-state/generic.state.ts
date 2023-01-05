import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patchMap, setMap } from '../operators';
import { GenericPayloadActionClass, GenericStateClass, GenericStateModel, IGenericActionsClass } from './generic.model';

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string | number>, EntityFetchType = {}>({
  idProperty,
  addOrUpdate,
  clearAndAdd,
  actionHandler,
}: {
  idProperty: IdProperty;
  addOrUpdate: GenericPayloadActionClass<EntityType>;
  clearAndAdd: GenericPayloadActionClass<EntityType>;
  actionHandler?: IGenericActionsClass<EntityType, EntityFetchType>;
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
    static clearAndAdd = clearAndAdd;
    static actionHandler = actionHandler;
    // static clear = clear;

    private static getId = (t: EntityType) => t[idProperty] as unknown as string;

    constructor() {}

    @Action(addOrUpdate)
    addOrUpdate({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }

    @Action(clearAndAdd)
    clearAndAdd({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(setMap(payload, GenericStateBase.getId));
    }

    // @Action(clear)
    // clear({ setState }: StateContext<GenericStateModel<EntityType>>): void {
    //   setState(clearMap());
    // }
  }
  return GenericStateBase;
}
