import { FastCastGameStatus } from '@client/espn-client.model';
import { MOCK_FASTCAST_TEAM_1, MOCK_FASTCAST_TEAM_2 } from './fastcast-team.model.mock';

const MOCK_FASTCAST_EVENT_LAST_PLAY = {
  id: '1',
  type: { id: '1', text: 'Run', abbreviation: 'r' },
  scoreValue: 6,
  text: 'James White 2 Yd Run',
};

const MOCK_FASTCAST_EVENT_TEAMS = {
  home: MOCK_FASTCAST_TEAM_2,
  away: MOCK_FASTCAST_TEAM_1,
};

export const MOCK_FASTCAST_EVENT_1 = {
  id: '400927752',
  uid: '',
  leagueId: '40',
  timestamp: 1645816274,
  state: FastCastGameStatus.Post,
  status: 'STATUS_IN_PROGRESS',
  name: 'New England Patriots at Atlanta Falcons',
  shortname: 'NE @ ATL',
  location: 'NRG Stadium',
  clock: '0:00',
  summary: 'Final/OT',
  period: 4,
  completed: false,
  teams: MOCK_FASTCAST_EVENT_TEAMS,
  isHalftime: false,
  lastPlay: MOCK_FASTCAST_EVENT_LAST_PLAY,
  mlbSituation: null,
  footballSituation: {
    shortDownDistanceText: '',
    possessionText: '',
    isRedZone: true,
    possession: '',
  },
};

export const MOCK_FASTCAST_EVENT_LIST = [MOCK_FASTCAST_EVENT_1];
export const MOCK_FASTCAST_EVENT_MAP = { [MOCK_FASTCAST_EVENT_1.id]: MOCK_FASTCAST_EVENT_1 };
