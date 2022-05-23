import { Selector } from '@ngxs/store';
import { EspnFastcastState, EspnFastcastStateModel } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState])
  static getConnected(state: EspnFastcastStateModel): number | null {
    return state.connect;
  }

  @Selector([EspnFastcastState])
  static getLastDisconnect(state: EspnFastcastStateModel): number | null {
    return state.disconnect;
  }

  @Selector([EspnFastcastState])
  static getLastRefresh(state: EspnFastcastStateModel): number | null {
    return state.lastRefresh;
  }

  @Selector([EspnFastcastState])
  static getEventType(state: EspnFastcastStateModel): string | null {
    return state.eventType;
  }
}
