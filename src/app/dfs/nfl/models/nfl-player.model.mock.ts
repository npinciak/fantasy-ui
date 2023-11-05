import { MOCK_DFS_SLATE_PLAYER } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { MOCK_GRIDIRON_PLAYER } from './nfl-gridIron.mock';
import { NflDfsPlayerTableData } from './nfl-player.model';

export const MOCK_NFL_PLAYER_TABLE_ROW: NflDfsPlayerTableData = {
  name: MOCK_GRIDIRON_PLAYER.player!,
  position: MOCK_GRIDIRON_PLAYER.pos!,
  rgTeamId: MOCK_DFS_SLATE_PLAYER.player.rg_team_id,
  ceil: MOCK_GRIDIRON_PLAYER.ceil,
  sdCeil: MOCK_GRIDIRON_PLAYER.sdCeil,
  floor: MOCK_GRIDIRON_PLAYER.floor,
  sdFloor: MOCK_GRIDIRON_PLAYER.sdFloor,
  tar: MOCK_GRIDIRON_PLAYER.tar,
  fpts: MOCK_GRIDIRON_PLAYER.fpts,
  sdFpts: MOCK_GRIDIRON_PLAYER.sdFpts,
  fptsPerDollar: MOCK_GRIDIRON_PLAYER.fptsPerDollar,
  pown: MOCK_GRIDIRON_PLAYER.pown,
  smash: MOCK_GRIDIRON_PLAYER.smash,
  value: MOCK_GRIDIRON_PLAYER.value,
  opp: MOCK_GRIDIRON_PLAYER.opp,
  salary: MOCK_GRIDIRON_PLAYER.salary,
  playerSiteId: MOCK_DFS_SLATE_PLAYER.schedule.salaries![0].player_id,
  oppPassDefRank: 1,
  oppRushDefRank: 2,
  valueTargetGPPs: 3,
  valueTargetCash: 4,
  targetValueDiffGPPs: 5,
  targetValueDiffCash: 6,
};

export const MOCK_NFL_PLAYER_TABLE_DATA: NflDfsPlayerTableData[] = [MOCK_NFL_PLAYER_TABLE_ROW];
