import { EspnFastcastStateModel } from '../models/fastcast-state.model';
import { EspnFastcastSelectors } from './espn-fastcast.selectors';

describe('FastCastSelector', () => {
  const state: EspnFastcastStateModel = {
    disconnect: new Date().getTime(),
    connect: new Date().getTime(),
    lastRefresh: new Date().getTime(),
    pause: false,
    eventType: null,
    league: null,
    connectionClosed: false,
  };

  describe('selectConnected', () => {
    it('retrieves connected timestamp', () => {
      const expected = EspnFastcastSelectors.getConnected(state.connect);
      expect(expected).toEqual(state.connect);
    });
  });

  describe('selectLastDisconnect', () => {
    it('retrieves disconnected timestamp', () => {
      const expected = EspnFastcastSelectors.getLastDisconnect(state.disconnect);
      expect(expected).toEqual(state.disconnect);
    });
  });

  describe('selectLastRefresh', () => {
    const emptyLastRefresh: EspnFastcastStateModel = {
      disconnect: new Date().getTime(),
      connect: new Date().getTime(),
      lastRefresh: null,
    };

    it('retrieves lastRefresh timestamp', () => {
      const expected = EspnFastcastSelectors.getLastRefresh(state.connect, state.lastRefresh);
      expect(expected).toEqual(state.lastRefresh);
    });

    it('retrieves connect timestamp if no lastRefresh', () => {
      const expected = EspnFastcastSelectors.getLastRefresh(emptyLastRefresh.connect, emptyLastRefresh.lastRefresh);
      expect(expected).toEqual(emptyLastRefresh.connect);
    });
  });
});
