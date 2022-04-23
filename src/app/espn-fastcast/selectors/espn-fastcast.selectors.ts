import { Selector } from '@ngxs/store';
import { EspnFastcastState } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState.selectConnected])
  static selectConnected(connected: number): number {
    return connected;
  }

  @Selector([EspnFastcastState.selectLastDisconnect])
  static selectLastDisconnect(lastDisconnect: number): number {
    return lastDisconnect;
  }

  @Selector([EspnFastcastState.selectConnected, EspnFastcastState.selectLastRefresh])
  static selectLastRefresh(lastconnected: number | null, lastRefresh: number): number {
    return lastRefresh ?? lastconnected;
  }
}
