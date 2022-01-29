import { Selector } from '@ngxs/store';
import { EspnFastcastState } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState.selectConnected])
  static selectConnected(connected: number): number | null {
    return connected ?? null;
  }

  @Selector([EspnFastcastState.selectLastDisconnect])
  static selectLastDisconnect(lastDisconnect: number): number | null {
    return lastDisconnect ?? null;
  }

  @Selector([EspnFastcastState.selectConnected, EspnFastcastState.selectLastRefresh])
  static selectLastRefresh(lastconnected: number | null, lastRefresh: number): number {
    return lastRefresh ?? lastconnected;
  }
}
