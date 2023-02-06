import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patchMap, setMap } from '../operators';
import { GenericStateClass, GenericStateModel, IGenericActionsClass } from './generic.model';

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string | number>, EntityFetchType extends {}>({
  idProperty,
  actionHandler,
}: {
  idProperty: IdProperty;
  actionHandler: IGenericActionsClass<EntityType, EntityFetchType>;
}): GenericStateClass<EntityType> {
  @State<GenericStateModel<EntityType>>({
    name: 'genericStateBase',
    defaults: {
      map: {},
    },
  })
  @Injectable()
  class GenericStateBase {
    static addOrUpdate = actionHandler.AddOrUpdate;
    static clearAndAdd = actionHandler.ClearAndAdd;

    private static getId = (t: EntityType) => t[idProperty] as string;

    @Action(GenericStateBase.addOrUpdate)
    addOrUpdate({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }

    @Action(GenericStateBase.clearAndAdd)
    clearAndAdd({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(setMap(payload, GenericStateBase.getId));
    }
  }
  return GenericStateBase;
}
