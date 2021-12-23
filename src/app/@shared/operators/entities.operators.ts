import { StateOperator } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EntitiesStateModel } from '../models';

type EntitiesStateModelType<T> = T extends EntitiesStateModel<infer U> ? U : never;

export const getKey = <T>(entity: T, fn?: (e: T) => number | string) => (fn ? fn(entity) : (entity as any).id);

export const entityMap = <T>(entities: T[], getId?: (t: T) => number | string) =>
  entities.reduce((acc, entity) => {
    acc[getKey(entity, getId)] = entity;
    return acc;
  }, {});

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function setMap<W extends EntitiesStateModel<U>, U>(
  entities: EntitiesStateModelType<W>[],
  getId?: (t: EntitiesStateModelType<W>) => number | string
): StateOperator<W> {
  return patch<EntitiesStateModel<U>>({
    map: entityMap(entities, getId),
  });
}

export const patchMap = <T>(entities: T[], getId?: (t: T) => number | string): StateOperator<EntitiesStateModel<T>> => {
  const idPatchMap = patch(entityMap(entities, getId));
  return patch<EntitiesStateModel<T>>({ map: idPatchMap });
};
