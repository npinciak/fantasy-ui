import { FastcastEventTeam } from './fastcast-team.model';

export const MOCK_FASTCAST_TEAM_1: FastcastEventTeam = {
  id: '1',
  uid: '',
  eventUid: '',
  isHome: '',
  score: '34',
  abbreviation: 'NE',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png',
  isWinner: true,
  name: 'Patriots',
  color: '02244A',
  altColor: 'b0b7bc',
  record: '14-2',
  rank: null,
  winPct: 0.9812,
};

export const MOCK_FASTCAST_TEAM_2: FastcastEventTeam = {
  id: '2',
  uid: '',
  eventUid: '',
  isHome: '',
  score: '28',
  abbreviation: 'ATL',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png',
  isWinner: false,
  name: 'Falcons',
  color: '000000',
  altColor: '',
  record: '11-5',
  rank: null,
  winPct: 0.0298,
};
