import { GenericSelectorClass } from '@app/@shared/generic-state/generic.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { PropertySelectors, Store, createPropertySelectors } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IBaseFreeAgentFilterState } from '../base-free-agents-filter.state';
import { IBaseFreeAgentsFilterStateModel } from './base-free-agents-filter.model';

export function BaseFreeAgentsFilterSelector(
  state: IBaseFreeAgentFilterState
): IBaseFreeAgentFilterSelectorsClass<IBaseFreeAgentsFilterStateModel> {
  class BaseFreeAgentsFilterSelectorClass {
    static slices = createPropertySelectors<IBaseFreeAgentsFilterStateModel>(state);

    @Selector([BaseFreeAgentsFilterSelectorClass.slices.selectedLineupSlotIds])
    static getSelectedLineupSlotIdsList(ids: { [id: number]: boolean }): string[] {
      return Object.keys(ids).filter(id => ids[id]);
    }

    @Selector([BaseFreeAgentsFilterSelectorClass.slices.selectedTeamIds])
    static getSelectedTeamIdsList(ids: { [id: number]: boolean }): string[] {
      return Object.keys(ids).filter(id => ids[id]);
    }

    @Selector([BaseFreeAgentsFilterSelectorClass.slices.selectedScoringPeriodIds])
    static getSelectedScoringPeriodIdsList(ids: { [id: number]: boolean }): string[] {
      return Object.keys(ids).filter(id => ids[id]);
    }

    @Selector([BaseFreeAgentsFilterSelectorClass.slices.selectedAvailabilityStatus])
    static getSelectedAvailabilityStatusList(ids: { [id: number]: boolean }): string[] {
      return Object.keys(ids).filter(id => ids[id]);
    }
  }
  return BaseFreeAgentsFilterSelectorClass;
}

export interface IBaseFreeAgentFilterSelectorsClass<StateModel extends object> {
  new (...args: any[]): any;
  slices: PropertySelectors<StateModel>;
  getSelectedLineupSlotIdsList(ids: { [id: number]: boolean }): string[];
  getSelectedTeamIdsList(ids: { [id: number]: boolean }): string[];
  getSelectedScoringPeriodIdsList(ids: { [id: number]: boolean }): string[];
  getSelectedAvailabilityStatusList(ids: { [id: number]: boolean }): string[];
}

type FacadeObject<T> = {
  [K in keyof T]: {
    value: T[K];
    select$: Observable<T[K]>;
  };
};

export interface ClassType {
  new (...args: any[]): any;
}

type SelectorProperties<T extends ClassType> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? {
        select$: Observable<ReturnType<T[K]>>;
        value: ReturnType<T[K]>;
      }
    : never;
};

export function createEntitiesFacadeGenerator<StateModel extends object>(store: Store, selectorClass: GenericSelectorClass<StateModel>) {
  const obj = {} as SelectorProperties<GenericSelectorClass<StateModel>>;
  const propertyNames: string[] = getFunctionPropertyNames(selectorClass);

  for (const prop of propertyNames) {
    obj[prop] = {
      value: store.selectSnapshot(selectorClass[prop] as keyof typeof selectorClass),
      select$: store.select(selectorClass[prop] as keyof typeof selectorClass),
    };
  }

  return obj;
}

export function createSliceFacadeGenerator<StateModel extends object>(
  store: Store,
  stateClass: StateModel,
  slices: PropertySelectors<StateModel>
) {
  const obj = {} as TestProperties<StateModel>;

  Object.keys(stateClass).forEach(key => {
    obj[key] = {
      value: store.selectSnapshot(slices[key]),
      select$: store.select(slices[key]),
    };
  });
  return obj;
}

type TestProperties<T extends object> = {
  [K in keyof T]: {
    value: T[K];
    select$: Observable<T[K]>;
  };
};

export function getFunctionPropertyNames(obj: ClassType & { [key: string]: any }) {
  const excludePropertiesSet = new Set(['caller', 'callee', 'arguments', 'stateClass', 'toString', 'apply', 'call', 'bind', 'constructor']);

  const propertyNamesSet = new Set<string>();

  while (obj && obj.constructor !== Object) {
    const props = Object.getOwnPropertyNames(obj);

    for (const prop of props) {
      if (excludePropertiesSet.has(prop) || typeof obj[prop] !== 'function') continue;
      propertyNamesSet.add(prop);
    }
    obj = Object.getPrototypeOf(obj);
  }

  return Array.from(propertyNamesSet);
}
