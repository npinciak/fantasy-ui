import { Configs, SlateConfig } from '@app/dfs/mlb/models/slateSettings.interface';
import { DfsSlateState } from '@app/dfs/mlb/state/dfs-slate.state';
import { NflDfsState } from '@app/dfs/nfl/state/nfl-dfs.state';
import { Selector } from '@ngxs/store';

export class NFLlineupSelectors {
  @Selector([DfsSlateState.slateConfigs])
  static getSlateConfigBySport(slateConfigs: SlateConfig): (sport: string) => Configs {
    return (sport: string) => slateConfigs[sport];
  }

  // @Selector([NFLlineupSelectors.getSlateConfigBySport])
  // static getSlateConfigBySlateType(getSlateConfigBySport: (sport: string) => Configs): (slateType: string) => Configs {

  // //  const getSlateConfigBySport = getSlateConfigBySport()

  //   return (slateType: string) => slateConfigs[sport];
  // }
}

