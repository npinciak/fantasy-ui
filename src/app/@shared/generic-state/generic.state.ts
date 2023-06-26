import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { PropertyOfType } from '@sports-ui/ui-sdk/helpers';
import { patchMap } from '../operators';
import { clearMap } from '../operators/entities.operators';
import { GenericStateClass, GenericStateModel, IGenericActionsClass } from './generic.model';

export function GenericState<EntityType, IdProperty extends PropertyOfType<EntityType, string | number>, EntityFetchType extends object>({
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
    static clear = actionHandler.Clear;

    private static getId = (t: EntityType) => t[idProperty] as unknown as string;

    @Action(GenericStateBase.addOrUpdate)
    addOrUpdate({ setState }: StateContext<GenericStateModel<EntityType>>, { payload }: { payload: EntityType[] }): void {
      setState(patchMap(payload, GenericStateBase.getId));
    }

    @Action(GenericStateBase.clear)
    clear({ setState }: StateContext<GenericStateModel<EntityType>>): void {
      setState(clearMap());
    }
  }
  return GenericStateBase;
}
