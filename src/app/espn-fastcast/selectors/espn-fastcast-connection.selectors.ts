import { Selector } from '@app/@shared/models/typed-selector';
import { EspnDateHelper } from '@app/espn/espn-date-helper';
import { createPropertySelectors } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk/helpers';
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
    const tickerDate = new EspnDateHelper().tickerDate;
    return exists(timestamp) ? tickerDate(timestamp) : null;
  }
}
