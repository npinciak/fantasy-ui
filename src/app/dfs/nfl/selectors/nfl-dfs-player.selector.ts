import { Selector } from '@ngxs/store';
import {
  NFLClientGridIronPlayer,
  NFLClientGridIronPlayerMap,
  ProfilerInfoQB,
  ProfilerInfoRB,
  ProfilerInfoReceiver,
} from '../models/nfl-client.model';
import { NflDfsPlayerGridIronState } from '../state/nfl-dfs-player-gridiron.state';
import { NflDfsProfilerState, ProfilerInfoMap } from '../state/nfl-dfs-profiler.state';

export class NFLDfsPlayerSelectors {
  @Selector([NflDfsProfilerState.season])
  static getPlayerProfilerSeasonById(players: ProfilerInfoMap): (id: string) => ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver {
    return (id: string) => players[id];
  }

  @Selector([NflDfsPlayerGridIronState.getGridIronPlayerMap])
  static getGridIronPlayerById(players: NFLClientGridIronPlayerMap): (id: string) => NFLClientGridIronPlayer {
    return (id: string) => players[id];
  }
}
