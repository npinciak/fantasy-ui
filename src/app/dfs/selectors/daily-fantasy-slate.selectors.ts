import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { ClientSiteSlateEntity, ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { Selector } from '@ngxs/store';
import { DailyFantasySlateState } from '../state/daily-fantasy-slate.state';

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SiteSlateEntity[] };

export class DailyFantasySlateSelectors extends GenericSelector(DailyFantasySlateState) {
  @Selector([DailyFantasySlateSelectors.getList])
  static getSlatesEmpty(slates: ClientSiteSlateEntity[]): boolean {
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
