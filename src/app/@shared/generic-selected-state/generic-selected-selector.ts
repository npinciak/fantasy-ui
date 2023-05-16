import { Selector } from '../models/typed-selector';
import { ISelectedSelectorClass, ISelectedStateClass } from './generic-selected.model';
import { SelectedStateModel } from './generic-selected.state.model';

export function SelectedSelector(stateClass: ISelectedStateClass): ISelectedSelectorClass {
  class SelectedSelectorBase {
    static stateClass = stateClass;

    @Selector([stateClass])
    static getSelectedIds(state: SelectedStateModel): string[] {
      return Object.keys(state.ids).filter(id => state.ids[id]);
    }

    @Selector([SelectedSelectorBase.getSelectedIds])
    static getSelectedIdsSet(ids: string[]): Set<string> {
      return new Set(ids);
    }

    @Selector([SelectedSelectorBase.getSelectedIds])
    static getSelectedIdsLength(ids: string[]): number {
      return ids.length;
    }

    @Selector([stateClass])
    static getToggledIds(state: SelectedStateModel): string[] {
      return Object.keys(state.ids);
    }

    @Selector([SelectedSelectorBase.getToggledIds])
    static getToggledIdsSet(ids: string[]): Set<string> {
      return new Set(ids);
    }

    @Selector([stateClass])
    static isIdSelected(state: SelectedStateModel): (id: string) => boolean {
      return (id: string) => !!state.ids[id];
    }

    @Selector([stateClass])
    static isIdToggled(state: SelectedStateModel): (id: string) => boolean {
      return (id: string) => id in state.ids;
    }
  }
  return SelectedSelectorBase;
}
