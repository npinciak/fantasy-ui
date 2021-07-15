import { StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EntitiesStateModel } from '../models';

const getKey = <T>(entity: T, fn?: (e: T) => number | string) =>
  fn ? fn(entity) : (entity as any).id;

const entityMap = <T>(entities: T[], getId?: (t: T) => number | string) =>
  entities.reduce((acc, entity) => {
    acc[getKey(entity, getId)] = entity;
    return acc;
  }, {});

const setMap = <T, W extends EntitiesStateModel<T>>(
  entities: T[],
  getId?: (t: T) => number | string
): StateOperator<W> =>
  patch<EntitiesStateModel<T>>({
    map: entityMap(entities, getId),
  });

const patchMap = <T>(
  entities: T[],
  getId?: (t: T) => number | string
): StateOperator<EntitiesStateModel<T>> => {
  const idPatchMap = patch(entityMap(entities, getId));
  return patch<EntitiesStateModel<T>>({ map: idPatchMap });
};

export { getKey, entityMap, setMap, patchMap };
