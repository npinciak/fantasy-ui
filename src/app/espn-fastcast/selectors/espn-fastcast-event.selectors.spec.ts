import { MOCK_FASTCAST_EVENT_1, MOCK_FASTCAST_EVENT_LIST, MOCK_FASTCAST_EVENT_MAP } from '../models/fastcast-event.model.mock';
import { MOCK_FASTCAST_TEAM_1 } from '../models/fastcast-team.model.mock';
import { EspnFastcastEventStateModel } from '../state/espn-fastcast-event.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';
import { EspnFastcastTeamSelectors } from './espn-fastcast-team.selectors';

describe('EspnFastcastEventSelectors', () => {
  const state: EspnFastcastEventStateModel = {
    map: MOCK_FASTCAST_EVENT_MAP,
  };

  const getTeamsByEventUid = EspnFastcastTeamSelectors.getTeamsByEventUid([MOCK_FASTCAST_TEAM_1]);

  const getFastcastEventsByLeagueId = EspnFastcastEventSelectors.getFastcastEventsByLeagueId(MOCK_FASTCAST_EVENT_LIST, getTeamsByEventUid);
  const getEventById = EspnFastcastEventSelectors.getEventById(state.map);

  describe('selectEventById', () => {
    it('should return event by id', () => {
      const expected = MOCK_FASTCAST_EVENT_1;
      const actual = getEventById(MOCK_FASTCAST_EVENT_1.id);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectEventList', () => {
    it('should return event list sorted', () => {
      const expected = MOCK_FASTCAST_EVENT_LIST;
      const actual = EspnFastcastEventSelectors.getEventList(state.map);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectFastcastEventsByLeagueId', () => {
    it('should return event list', () => {
      const expected = MOCK_FASTCAST_EVENT_LIST;
      const actual = getFastcastEventsByLeagueId(MOCK_FASTCAST_EVENT_1.leagueId);

      expect(actual).toEqual(expected);
    });
  });
});
