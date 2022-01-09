import { Selector } from '@ngxs/store';
import { DfsPlayer } from '../class/player.class';
import { DfsSite } from '../../dfs.const';
import { DfsSlate, SlateMaster } from '../models/slateMaster.interface';
import { SlatePlayerAttr } from '../models/slatePlayer.interface';
import { SiteConfig, SiteSlateConfig } from '../models/slateSettings.interface';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { DailyFantasySlateState } from '@app/dfs/state/daily-fantasy-slate.state';

export enum SlateType {
  classic = 'classic',
  pick = 'pickem',
  showdown = 'showdown',
}

export class SlateSelectors {
  @Selector([MlbDfsState.slateConfigs])
  static selectSlateConfigBySite(sites: SiteSlateConfig): (site: string) => SiteConfig {
    return (site: string) => sites[site];
  }

  @Selector([DailyFantasySlateState.slates])
  static selectSlateById(slates: { [id: number]: DfsSlate }): (id: number) => DfsSlate {
    return (id: number) => slates[id];
  }

  @Selector([DailyFantasySlateState.slates])
  static selectSlateList(slates: { [id: number]: DfsSlate }): DfsSlate[] {
    return Object.values(slates);
  }

  @Selector([SlateSelectors.selectSlateList])
  static slatesEmpty(slates: DfsSlate[]): boolean {
    return slates.length === 0;
  }

  @Selector([SlateSelectors.selectSlateList])
  static selectSlateByType(slates: DfsSlate[]): { [slateType in SlateType]: DfsSlate[] } {
    return {
      [SlateType.classic]: slates.filter(slate => slate.type === SlateType.classic),
      [SlateType.pick]: slates.filter(slate => slate.type === SlateType.pick),
      [SlateType.showdown]: slates.filter(slate => slate.type === SlateType.showdown),
    };
  }

  @Selector([SlateSelectors.selectSlateList])
  static getSlatesByClassic(slates: DfsSlate[]): DfsSlate[] {
    return slates.filter(slate => slate.type === SlateType.classic);
  }
}

export interface SlateMap {
  [id: number]: DfsSlate;
}
