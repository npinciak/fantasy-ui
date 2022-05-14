import { StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EntitiesStateModel } from '../models/entities-state.model';

type EntitiesStateModelType<T> = T extends EntitiesStateModel<infer U> ? U : never;

export const getKey = <T>(entity: T, fn?: (e: T) => number | string) => (fn ? fn(entity) : (entity as any).id);

export function map<T>(entities: T[], getId?: (t: T) => number | string) {
  return entities.reduce((acc, entity) => {
    acc[getKey(entity, getId)] = entity;
    return acc;
  }, {});
}

export function patchMap<W extends EntitiesStateModel<U>, U>(
  entities: EntitiesStateModelType<W>[],
  getId?: (t: EntitiesStateModelType<W>) => number | string
): StateOperator<EntitiesStateModel<U>> {
  const idPatchMap = patch(map(entities, getId));
  return patch<EntitiesStateModel<U>>({ map: idPatchMap });
}

export function setMap<W extends EntitiesStateModel<U>, U>(
  entities: EntitiesStateModelType<W>[],
  getId?: (t: EntitiesStateModelType<W>) => number | string
): StateOperator<W> {
  return patch<EntitiesStateModel<U>>({
    map: map(entities, getId),
  });
}

export function clearMap<W extends EntitiesStateModel<U>, U>(): StateOperator<W> {
  return patch<EntitiesStateModel<U>>({
    map: {},
  });
}

// export function patchEntity<W extends EntitiesStateModel<U>, U>(
//   id: number | string,
//   deepPartial: DeepPartial<EntitiesStateModelType<W>>
// ): StateOperator<EntitiesStateModel<U>> {
//   return (state: Readonly<EntitiesStateModel<U>>) => ({
//     ...state,
//     map: {
//       ...state.map,
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       [id]: deepmergeDeepPartial(state.map[id]!, deepPartial),
//     },
//   });
// }

export function setEntity<W extends EntitiesStateModel<U>, U>(
  entity: EntitiesStateModelType<W>,
  id: number | string = getKey(entity)
): StateOperator<EntitiesStateModel<U>> {
  const idPatchMap = patch({ [id as any]: entity });
  return patch<EntitiesStateModel<U>>({ map: idPatchMap });
}

export function removeEntities<T>(ids: (number | string)[]): StateOperator<EntitiesStateModel<T>> {
  return (state: Readonly<EntitiesStateModel<T>>) => ({
    ...state,
    map: Object.keys(state.map)
      .filter(o => !ids.includes(o))
      .reduce((acc, o) => {
        acc[o] = state.map[o];
        return acc;
      }, {}),
  });
}

export function removeEntity<T>(id: number | string): StateOperator<EntitiesStateModel<T>> {
  return removeEntities([id]);
}
