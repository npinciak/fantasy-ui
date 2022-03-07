import { GridIronPlayer, GridIronPlayerMap } from './nfl-gridIron.model';

export const MOCK_NFL_GRIDIRON_PLAYER_1: GridIronPlayer = {
  playerid: 1,
  player: 0,
  att: 0,
  cmp: 0,
  payds: 0,
  patd: 0,
  int: 0,
  ruatt: 0,
  ruyds: 0,
  tar: 0,
  rec: 0,
  reyds: 0,
  ruydsRecyds: 0,
  td: 0,
  partnerid: 0,
  fpts: 0,
  fpts$: 0,
  ceil: 0,
  floor: 0,
};

export const MOCK_NFL_GRIDIRON_PLAYER_MAP: GridIronPlayerMap = {
  [MOCK_NFL_GRIDIRON_PLAYER_1.playerid]: MOCK_NFL_GRIDIRON_PLAYER_1,
};

export const MOCK_NFL_GRIDIRON_PLAYER_LIST: GridIronPlayer[] = [MOCK_NFL_GRIDIRON_PLAYER_1];
