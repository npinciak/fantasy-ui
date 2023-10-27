import { MOCK_DFS_SLATE_PLAYER } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { SlatePlayer } from './player.model';

export const SLATE_PLAYER_MOCK: SlatePlayer = {
  id: MOCK_DFS_SLATE_PLAYER.player.id,
  name: `${MOCK_DFS_SLATE_PLAYER.player.first_name} ${MOCK_DFS_SLATE_PLAYER.player.last_name}`,
  position: MOCK_DFS_SLATE_PLAYER.player.position,
  salaries: [
    {
      position: MOCK_DFS_SLATE_PLAYER.schedule.salaries![0].position,
      salary: MOCK_DFS_SLATE_PLAYER.schedule.salaries![0].salary,
      player_id: MOCK_DFS_SLATE_PLAYER.schedule.salaries![0].player_id,
    },
  ],
  rgId: MOCK_DFS_SLATE_PLAYER.player.rg_id,
  teamId: MOCK_DFS_SLATE_PLAYER.player.team_id,
  rgTeamId: MOCK_DFS_SLATE_PLAYER.player.rg_team_id,
  gameId: MOCK_DFS_SLATE_PLAYER.schedule.id,
};
