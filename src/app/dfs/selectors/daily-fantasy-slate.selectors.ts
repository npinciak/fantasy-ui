import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { DfsSlatesState } from '../state/dfs-slates.state';

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SiteSlateEntity[] };

export class DailyFantasySlateSelectors extends GenericSelector(DfsSlatesState) {
  @Selector([DailyFantasySlateSelectors.getList])
  static getSlatesEmpty(slates: SiteSlateEntity[]): boolean {
    return slates.length <= 0;
  }

  @Selector([DailyFantasySlateSelectors.getList])
  static getSlateByType(slates: SiteSlateEntity[]): SlateTypeMap {
    return {
      [ClientSlateTypes.Classic]: slates.filter(slate => slate.type === ClientSlateTypes.Classic),
      [ClientSlateTypes.Pickem]: slates.filter(slate => slate.type === ClientSlateTypes.Pickem),
      [ClientSlateTypes.Showdown]: slates.filter(slate => slate.type === ClientSlateTypes.Showdown),
      [ClientSlateTypes.Short]: slates.filter(slate => slate.type === ClientSlateTypes.Short),
    };
  }
}
