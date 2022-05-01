import { MOCK_LEAGUE_1 } from '@app/espn/models/league.model.mock';
import { MOCK_FASTCAST_EVENT_LIST } from './fastcast-event.model.mock';
import { FastcastLeague } from './fastcast-league.model';

export const MOCK_FASTCAST_LEAGUE_1: FastcastLeague = {
  ...MOCK_LEAGUE_1,
  events: MOCK_FASTCAST_EVENT_LIST,
};
