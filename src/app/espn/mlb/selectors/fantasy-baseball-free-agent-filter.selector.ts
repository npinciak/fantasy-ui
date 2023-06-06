import { Selector } from '@app/@shared/models/typed-selector';
import { createPropertySelectors } from '@ngxs/store';
import { PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';
import {
  FantasyBaseballFreeAgentsFilterState,
  FantasyBaseballFreeAgentsFilterStateModel,
} from '../state/fantasy-baseball-free-agents-filter.state';

export class FantasyBaseballFreeAgentFilterSelector {
  static slices = createPropertySelectors<FantasyBaseballFreeAgentsFilterStateModel>(FantasyBaseballFreeAgentsFilterState);

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.lineupSlotIds])
  static getLineupSlotIds(lineupSlotIds) {
    return lineupSlotIds;
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getLineupSlotIds])
  static getSelectedLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.availabilityStatus])
  static getSelectedAvailabilityStatus(ids: { [key in PlayerAvailabilityStatus]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.topScoringPeriodIds])
  static getSelectedTopScoringPeriodIds(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.availabilityStatus])
  static getToggledAvailabilityStatusIds(ids: { [key in PlayerAvailabilityStatus]: boolean }): string[] {
    return Object.keys(ids);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getToggledAvailabilityStatusIds])
  static getToggledIdsAvailabilityStatusSet(ids: string[]): Set<string> {
    return new Set(ids);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.lineupSlotIds])
  static getToggledLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getToggledLineupSlotIds])
  static getToggledLineupSlotIdsSet(ids: string[]): Set<string> {
    return new Set(ids);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.availabilityStatus])
  static isSelectedAvailabilityStatusSelected(ids: { [key in PlayerAvailabilityStatus]: boolean }): (id: string) => boolean {
    return (id: string) => !!ids[id];
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.availabilityStatus])
  static isSelectedAvailabilityStatusToggled(ids: { [key in PlayerAvailabilityStatus]: boolean }): (id: string) => boolean {
    return (id: string) => id in ids;
  }
  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.lineupSlotIds])
  static isSelectedLineupSlotIdSelected(ids: { [id: number]: boolean }): (id: string) => boolean {
    return (id: string) => !!ids[id];
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.slices.lineupSlotIds])
  static isSelectedLineupSlotIdToggled(ids: { [id: number]: boolean }): (id: string) => boolean {
    return (id: string) => id in ids;
  }
}
