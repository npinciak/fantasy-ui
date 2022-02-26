import { MOCK_FASTCAST_EVENT_1, MOCK_FASTCAST_EVENT_2 } from '../models/fastcast-event.model.mock';
import { EspnFastcastEventStateModel } from '../state/espn-fastcast-event.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';

describe('EspnFastcastEventSelectors', () => {
  const state: EspnFastcastEventStateModel = {
    map: {
      [MOCK_FASTCAST_EVENT_1.id]: MOCK_FASTCAST_EVENT_1,
      [MOCK_FASTCAST_EVENT_2.id]: MOCK_FASTCAST_EVENT_2,
    },
  };

  describe('selectEventById', () => {
    it('should return event by id', () => {
      const expected = MOCK_FASTCAST_EVENT_1;
      const actual = EspnFastcastEventSelectors.selectEventById(state.map)(MOCK_FASTCAST_EVENT_1.id);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectEventList', () => {
    it('should return event list sorted', () => {
      const expected = [MOCK_FASTCAST_EVENT_2, MOCK_FASTCAST_EVENT_1];
      const actual = EspnFastcastEventSelectors.selectEventList(state.map);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectFastcastEventsByLeagueId', () => {
    it('should return event list', () => {
      const expected = [MOCK_FASTCAST_EVENT_2, MOCK_FASTCAST_EVENT_1];
      const actual = EspnFastcastEventSelectors.selectFastcastEventsByLeagueId([MOCK_FASTCAST_EVENT_1, MOCK_FASTCAST_EVENT_2])(
        MOCK_FASTCAST_EVENT_1.leagueId
      );

      expect(actual).toEqual(expected);
    });
  });
});
