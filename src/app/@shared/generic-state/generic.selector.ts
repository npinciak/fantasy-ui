import { Selector } from '../models/typed-selector';
import { GenericSelectorClass, GenericStateClass, GenericStateModel } from './generic.model';

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
