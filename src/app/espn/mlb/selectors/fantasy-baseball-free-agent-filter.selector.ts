import { Selector } from '@app/@shared/models/typed-selector';
import {
  FantasyBaseballFreeAgentsFilterState,
  FantasyBaseballFreeAgentsFilterStateModel,
} from '../state/fantasy-baseball-free-agents-filter.state';

export class FantasyBaseballFreeAgentFilterSelector {
  @Selector([FantasyBaseballFreeAgentsFilterState])
  static getState(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state;
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getState])
  static getLineupSlotIds(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.lineupSlotIds;
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getLineupSlotIds])
  static getSelectedLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getState])
  static getAvailabilityStatus(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.availabilityStatus;
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getAvailabilityStatus])
  static getSelectedAvailabilityStatus(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getState])
  static getTopScoringPeriodIds(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.topScoringPeriodIds;
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getTopScoringPeriodIds])
  static getSelectedTopScoringPeriodIds(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentFilterSelector.getState])
  static getPagination(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.metaData;
  }
}
