import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patchMap } from '../operators';
import { GenericPayloadPatchActionClass } from './generic.actions';
import { GenericStateModel } from './generic.model';

export interface GenericStateClass<T> {
  new (...args: any[]): any;
  patchAction: GenericPayloadPatchActionClass<T>;
}

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string>>({
  idProperty,
  patchAction,
}: {
  idProperty: IdProperty;
  patchAction: GenericPayloadPatchActionClass<EntityType>;
}): GenericStateClass<EntityType> {
  @State<GenericStateModel<EntityType>>({
    name: 'genericStateBase',
    defaults: {
      map: {},
    },
  })
  @Injectable()
  class GenericStateBase {
    static patchAction = patchAction;

    private static getId = (t: EntityType) => t[idProperty] as unknown as string;

    constructor() {}

    @Action(patchAction)
    patchAction({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }
  }
  return GenericStateBase;
}
