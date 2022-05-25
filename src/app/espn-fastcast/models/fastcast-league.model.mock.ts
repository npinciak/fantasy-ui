import { MOCK_LEAGUE_1 } from '@app/espn/models/league.model.mock';
import { MOCK_FASTCAST_EVENT_LIST } from './fastcast-event.model.mock';

export const MOCK_FASTCAST_LEAGUE_1 = {
  ...MOCK_LEAGUE_1,
  events: MOCK_FASTCAST_EVENT_LIST,
};
