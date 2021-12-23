import { FastcastEventTeam } from './fastcast-team.model';

export const MOCK_FASTCAST_TEAM_1: FastcastEventTeam = {
  id: '1',
  score: '34',
  abbrev: 'NE',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png',
  isWinner: true,
  name: 'Patriots',
  color: '02244A',
  altColor: 'b0b7bc',
  record: '14-2',
  rank: null,
  winPct: 0.9812,
  hasPossession: true,
};

export const MOCK_FASTCAST_TEAM_2: FastcastEventTeam = {
  id: '2',
  score: '28',
  abbrev: 'ATL',
  logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png',
  isWinner: false,
  name: 'Falcons',
  color: '',
  altColor: '',
  record: '11-5',
  rank: null,
  winPct: 0.0298,
  hasPossession: false,
};
