import { Selector } from '@app/@shared/models/typed-selector';
import { EspnFastcastEventToggleState, EspnFastcastEventToggleStateModel } from '../state/espn-fastcast-event-toggle.state';

export class EspnFastcastEventToggleSelectors {
  @Selector()
  static selectIds(state: EspnFastcastEventToggleStateModel): { [id: string]: boolean } {
    return state.ids;
  }

  @Selector([EspnFastcastEventToggleSelectors.selectIds])
  static getSelectedIds(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([EspnFastcastEventToggleState])
  static getToggledIds(state: EspnFastcastEventToggleStateModel): string[] {
    return Object.keys(state.ids);
  }

  @Selector([EspnFastcastEventToggleSelectors.getToggledIds])
  static getToggledIdsSet(ids: string[]): Set<string> {
    return new Set(ids);
  }

  @Selector([EspnFastcastEventToggleState])
  static isIdSelected(state: EspnFastcastEventToggleStateModel): (id: string) => boolean {
    return (id: string) => !!state.ids[id];
  }

  @Selector([EspnFastcastEventToggleState])
  static isIdToggled(state: EspnFastcastEventToggleStateModel): (id: string) => boolean {
    return (id: string) => id in state.ids;
  }
}
