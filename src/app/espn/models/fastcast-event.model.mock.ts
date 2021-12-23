import { FastCastGameStatus } from '../espn.service';
import { FastcastEvent } from './fastcast-event.model';
import { MOCK_FASTCAST_TEAM_1, MOCK_FASTCAST_TEAM_2 } from './fastcast-team.model.mock';

export const MOCK_FASTCAST_EVENT_1: FastcastEvent = {
  id: '400927752',
  state: FastCastGameStatus.Post,
  status: 'STATUS_IN_PROGRESS',
  name: 'New England Patriots at Atlanta Falcons',
  shortname: 'NE @ ATL',
  location: 'NRG Stadium',
  clock: '0:00',
  summary: 'Final/OT',
  period: 4,
  teams: {
    home: MOCK_FASTCAST_TEAM_2,
    away: MOCK_FASTCAST_TEAM_1,
  },
  isRedzone: true,
  isHalftime: false,
  downDistanceText: '1st & 10',
  possessionText: 'ATL',
  lastPlay: null,
};
