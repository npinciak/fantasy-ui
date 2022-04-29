import { Selector } from '@ngxs/store';
import { EspnFastcastState } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState.selectConnected])
  static selectConnected(connected: number | null): number | null {
    return connected;
  }

  @Selector([EspnFastcastState.selectLastDisconnect])
  static selectLastDisconnect(lastDisconnect: number | null): number | null {
    return lastDisconnect;
  }

  @Selector([EspnFastcastState.selectConnected, EspnFastcastState.selectLastRefresh])
  static selectLastRefresh(lastconnected: number | null, lastRefresh: number | null): number {
    return lastRefresh ?? lastconnected;
  }
}
