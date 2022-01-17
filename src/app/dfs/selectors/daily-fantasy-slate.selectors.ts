import { Selector } from '@ngxs/store';
import { ClientSlateTypes, SiteConfig, SiteSlateConfig, SiteSlateEntity, SlateMaster } from '../models/daily-fantasy-client.model';
import { DailyFantasySlateState, SlateMasterMap } from '../state/daily-fantasy-slate.state';

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SiteSlateEntity[] };

export class DailyFantasySlateSelectors {
  @Selector([DailyFantasySlateState.slateMap])
  static selectSlateConfigBySite(sites: SiteSlateConfig): (site: string) => SiteConfig {
    return (site: string) => sites[site];
  }

  @Selector([DailyFantasySlateState.slateMap])
  static selectSlateById(slates: SlateMasterMap): (id: string) => SlateMaster {
    return (id: string) => slates[id];
  }

  @Selector([DailyFantasySlateState.slateMap])
  static selectSlateList(slates: SlateMasterMap): SlateMaster[] {
    return Object.values(slates);
  }

  @Selector([DailyFantasySlateSelectors.selectSlateList])
  static slatesEmpty(slates: SiteSlateEntity[]): boolean {
    return slates.length === 0;
  }

  @Selector([DailyFantasySlateSelectors.selectSlateList])
  static selectSlateByType(slates: SiteSlateEntity[]): SlateTypeMap {
    return {
      [ClientSlateTypes.Classic]: slates.filter(slate => slate.type === ClientSlateTypes.Classic),
      [ClientSlateTypes.Pickem]: slates.filter(slate => slate.type === ClientSlateTypes.Pickem),
      [ClientSlateTypes.Showdown]: slates.filter(slate => slate.type === ClientSlateTypes.Showdown),
      [ClientSlateTypes.Short]: slates.filter(slate => slate.type === ClientSlateTypes.Short),
    };
  }

  @Selector([DailyFantasySlateSelectors.selectSlateList])
  static getSlatesByClassic(slates: SiteSlateEntity[]): SiteSlateEntity[] {
    return slates.filter(slate => slate.type === ClientSlateTypes.Classic);
  }
}
