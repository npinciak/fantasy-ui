import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { EspnFastcastSelectors } from './espn-fastcast.selectors';

describe('FastCastSelector', () => {
  describe('selectEventById', () => {
    const state = { [MOCK_FASTCAST_EVENT_1.id]: MOCK_FASTCAST_EVENT_1 };
    const expected = MOCK_FASTCAST_EVENT_1;

    it('retrieves event by id', () => {
      const selectEventById = () => expected;
      const result = EspnFastcastSelectors.selectEventById(state);
      expect(result).toEqual(expected);
    });
  });

  describe('selectEventsMapList', () => {
    it('retrieves event map list', () => {});
  });
});
