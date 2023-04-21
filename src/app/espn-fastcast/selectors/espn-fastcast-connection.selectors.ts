import { tickerDate } from '@app/@shared/helpers/date';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { createPropertySelectors } from '@ngxs/store';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastConnectionState } from '../state/espn-fastcast-connection.state';

export class EspnFastcastConnectionSelectors {
  static slices = createPropertySelectors<EspnFastcastConnectionStateModel>(EspnFastcastConnectionState);

  @Selector([EspnFastcastConnectionSelectors.slices.connectionClosed, EspnFastcastConnectionSelectors.slices.pause])
  static showNoEventsMessage(connectionClosed: boolean, isPaused: boolean) {
    return connectionClosed && isPaused;
  }

  @Selector([EspnFastcastConnectionSelectors.slices.lastRefresh])
  static getLastRefreshAsTickerDate(timestamp: number | null) {
    return exists(timestamp) ? tickerDate(timestamp) : null;
  }
}
