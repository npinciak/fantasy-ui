import { MOCK_FASTCAST_EVENT_1 } from './fastcast-event.model.mock';
import { FastcastLeague } from './fastcast-league.model';
import { MOCK_LEAGUE_1 } from './league.model.mock';

export const MOCK_FASTCAST_LEAGUE_1: FastcastLeague = {
  ...MOCK_LEAGUE_1,
  events: [MOCK_FASTCAST_EVENT_1],
};
