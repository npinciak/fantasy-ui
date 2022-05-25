import { Selector } from '@ngxs/store';
import { GenericStateModel } from './generic.model';
import { GenericStateClass } from './generic.state';

export interface GenericSelectorClass<T> {
  new (...args: any[]): any;
  stateClass: GenericStateClass<T>;
  getMap(state: GenericStateModel<T>): Record<string, T>;
  getById(map: Record<string, T>): (id: string | null) => T | null;
  getList(map: Record<string, T>): T[];
  getIdList(map: Record<string, T>): string[];
  getIdSet(list: string[]): Set<string>;
}

export function GenericSelector<EntityType>(stateClass: GenericStateClass<EntityType>): GenericSelectorClass<EntityType> {
  class GenericSelectorBase {
    static stateClass = stateClass;

    @Selector([stateClass])
    static getMap(state: GenericStateModel<EntityType>): Record<string, EntityType> {
      return state.map;
    }

    @Selector([GenericSelectorBase.getMap])
    static getById(map: Record<string, EntityType>): (id: string | null) => EntityType | null {
      return (id: string | null) => {
        if (id == null) return null;
        return map[id] ?? null;
      };
    }

    @Selector([GenericSelectorBase.getMap])
    static getList(map: Record<string, EntityType>): EntityType[] {
      return Object.values(map);
    }

    @Selector([GenericSelectorBase.getMap])
    static getIdList(map: Record<string, EntityType>): string[] {
      return Object.keys(map);
    }

    @Selector([GenericSelectorBase.getIdList])
    static getIdSet(list: string[]): Set<string> {
      return new Set(list);
    }
  }
  return GenericSelectorBase;
}
