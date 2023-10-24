import { Player, SlatePlayer } from '@app/dfs/models/player.model';
import { GridIronPlayer } from './nfl-gridIron.model';

export type NflDfsPlayer = Player;

export type NflDfsPlayerTableData = Pick<SlatePlayer, 'name' | 'rgTeamId' | 'position'> &
  Pick<
    GridIronPlayer,
    'ceil' | 'sdCeil' | 'floor' | 'sdFloor' | 'tar' | 'fpts' | 'sdFpts' | 'fptsPerDollar' | 'pown' | 'smash' | 'value' | 'opp' | 'salary'
  > & {
    playerSiteId: string | null;
    oppPassDefRank: number | null;
    oppRushDefRank: number | null;
    valueTargetGPPs: number;
    valueTargetCash: number;
    minimumFantasyPointsCash: number;
    minimumFantasyPointsGPPs: number;
  };
