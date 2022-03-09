import { Selector } from '@ngxs/store';
import { ClientSiteSlateEntity, ClientSlateTypes, SiteSlateEntity, SlateMasterMap } from '../models/daily-fantasy-client.model';
import { DailyFantasySlateState } from '../state/daily-fantasy-slate.state';

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SiteSlateEntity[] };

export class DailyFantasySlateSelectors {
  @Selector([DailyFantasySlateState.slateMap])
  static selectSlateList(slates: SlateMasterMap): ClientSiteSlateEntity[] {
    return Object.values(slates);
  }

  @Selector([DailyFantasySlateSelectors.selectSlateList])
  static slatesEmpty(slates: ClientSiteSlateEntity[]): boolean {
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
}
