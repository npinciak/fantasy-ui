import { Selector } from '@app/@shared/models/typed-selector';
import { createPropertySelectors } from '@ngxs/store';
import { PlayerAvailabilityStatus } from '@sports-ui/ui-sdk/espn-client';
import {
  FantasyFootballFreeAgentFilterStateModel,
  FantasyFootballFreeAgentsFilterState,
} from '../state/fantasy-football-free-agent-filter.state';

export class FantasyFootballFreeAgentFilterSelector {
  static slices = createPropertySelectors<FantasyFootballFreeAgentFilterStateModel>(FantasyFootballFreeAgentsFilterState);

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.lineupSlotIds])
  static getSelectedLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.availabilityStatus])
  static getSelectedAvailabilityStatus(ids: { [key in PlayerAvailabilityStatus]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.topScoringPeriodIds])
  static getSelectedTopScoringPeriodIds(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.availabilityStatus])
  static getToggledAvailabilityStatusIds(ids: { [key in PlayerAvailabilityStatus]: boolean }): string[] {
    return Object.keys(ids);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.getToggledAvailabilityStatusIds])
  static getToggledIdsAvailabilityStatusSet(ids: string[]): Set<string> {
    return new Set(ids);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.lineupSlotIds])
  static getToggledLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.getToggledLineupSlotIds])
  static getToggledLineupSlotIdsSet(ids: string[]): Set<string> {
    return new Set(ids);
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.availabilityStatus])
  static isSelectedAvailabilityStatusSelected(ids: { [key in PlayerAvailabilityStatus]: boolean }): (id: string) => boolean {
    return (id: string) => !!ids[id];
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.availabilityStatus])
  static isSelectedAvailabilityStatusToggled(ids: { [key in PlayerAvailabilityStatus]: boolean }): (id: string) => boolean {
    return (id: string) => id in ids;
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.lineupSlotIds])
  static isSelectedLineupSlotIdSelected(ids: { [id: number]: boolean }): (id: string) => boolean {
    return (id: string) => !!ids[id];
  }

  @Selector([FantasyFootballFreeAgentFilterSelector.slices.lineupSlotIds])
  static isSelectedLineupSlotIdToggled(ids: { [id: number]: boolean }): (id: string) => boolean {
    return (id: string) => id in ids;
  }
}
