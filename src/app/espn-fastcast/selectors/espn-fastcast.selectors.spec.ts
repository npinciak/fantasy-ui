import { EspnFastcastStateModel } from '../state/espn-fastcast.state';
import { EspnFastcastSelectors } from './espn-fastcast.selectors';

describe('FastCastSelector', () => {
  const state: EspnFastcastStateModel = {
    disconnect: new Date().getTime(),
    connect: new Date().getTime(),
    lastRefresh: new Date().getTime(),
  };

  describe('selectConnected', () => {
    it('retrieves connected timestamp', () => {
      const expected = EspnFastcastSelectors.selectConnected(state.connect);
      expect(expected).toEqual(state.connect);
    });
  });

  describe('selectLastDisconnect', () => {
    it('retrieves disconnected timestamp', () => {
      const expected = EspnFastcastSelectors.selectLastDisconnect(state.disconnect);
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
      const expected = EspnFastcastSelectors.selectLastRefresh(state.connect, state.lastRefresh);
      expect(expected).toEqual(state.lastRefresh);
    });

    it('retrieves connect timestamp if no lastRefresh', () => {
      const expected = EspnFastcastSelectors.selectLastRefresh(emptyLastRefresh.connect, emptyLastRefresh.lastRefresh);
      expect(expected).toEqual(emptyLastRefresh.connect);
    });
  });
});