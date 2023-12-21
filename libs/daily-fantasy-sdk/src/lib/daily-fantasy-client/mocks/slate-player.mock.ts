import { ClientSlatePlayer } from '../slate-player.model';

export const MOCK_DFS_SLATE_PLAYER: ClientSlatePlayer = {
  fpts: 28.4,
  player: {
    id: '823156',
    rg_id: '35616',
    first_name: 'Tyreek',
    last_name: 'Hill',
    position: 'WR',
    sport_id: '1',
    team_id: '345',
    rg_team_id: '10',
    xml_id: '01d8aee3-e1c4-4988-970a-8c0c2d08bd83',
  },
  schedule: {
    date: '2023-10-29 17:00:00',
    id: '5940497',
    rg_id: '98149',
    sport_id: '1',
    team_away: { hashtag: 'NE', id: '348', rg_id: '11', name: 'Patriots' },
    team_home: { hashtag: 'MIA', id: '345', rg_id: '10', name: 'Dolphins' },
    salaries: [{ position: 'WR', salary: 9500, player_id: '30500861' }],
  },
  stat_group: 'wr',
  status: null,
};
