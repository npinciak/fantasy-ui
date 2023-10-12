import { Player, SlatePlayer } from '@app/dfs/models/player.model';
import { GridIronPlayer } from './nfl-gridIron.model';

export type NflDfsPlayer = Player;

export type NflDfsPlayerTableData = Pick<SlatePlayer, 'name' | 'rgTeamId' | 'position'> &
  Pick<GridIronPlayer, 'ceil' | 'floor' | 'tar' | 'fpts' | 'fptsPerDollar' | 'pown' | 'smash' | 'value' | 'opp' | 'salary'> & {
    oppPassDefRank: number | null;
    oppRushDefRank: number | null;
  };
