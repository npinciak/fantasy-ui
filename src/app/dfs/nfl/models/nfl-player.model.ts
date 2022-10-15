import { Player, SlatePlayer } from '@app/dfs/models/player.model';
import { GridIronPlayer } from './nfl-gridIron.model';

export type NflDfsPlayer = Player;

export type NflDfsPlayerTableData = Pick<SlatePlayer, 'name' | 'teamId' | 'position'> &
  Pick<GridIronPlayer, 'ceil' | 'floor' | 'tar' | 'fpts' | 'fptsPerK' | 'pown' | 'smash'> & { salary: number | null };
