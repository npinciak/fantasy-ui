import { Selector } from '@ngxs/store';
import { GridIronPlayer, GridIronPlayerMap } from '../models/nfl-gridIron.model';
import { PlayerProfiler, PlayerProfilerTimeframeMap } from '../models/nfl-profiler.model';
import { NflDfsPlayerGridIronState } from '../state/nfl-dfs-player-gridiron.state';
import { NflDfsProfilerState } from '../state/nfl-dfs-profiler.state';

export class NFLDfsPlayerSelectors {
  @Selector([NflDfsProfilerState.season])
  static getPlayerProfilerSeasonById(players: PlayerProfilerTimeframeMap): (id: string) => PlayerProfiler {
    return (id: string) => players[id];
  }

  @Selector([NflDfsPlayerGridIronState.getGridIronPlayerMap])
  static getGridIronPlayerById(players: GridIronPlayerMap): (id: string) => GridIronPlayer {
    return (id: string) => players[id];
  }
}
