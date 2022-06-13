import { Selector } from '@app/@shared/models/typed-selector';
import {
  FantasyBaseballFreeAgentsFilterState,
  FantasyBaseballFreeAgentsFilterStateModel,
} from '../state/fantasy-baseball-free-agents-filter.state';

export class FantasyBaseballFreeAgentsFilterSelector {
  @Selector([FantasyBaseballFreeAgentsFilterState])
  static getState(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state;
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getState])
  static getLineupSlotIds(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.lineupSlotIds;
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getLineupSlotIds])
  static getSelectedLineupSlotIds(ids: { [id: number]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getState])
  static getAvailabilityStatus(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.availabilityStatus;
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getAvailabilityStatus])
  static getSelectedAvailabilityStatus(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getState])
  static getScoringPeriodIds(state: FantasyBaseballFreeAgentsFilterStateModel) {
    return state.scoringPeriodIds;
  }

  @Selector([FantasyBaseballFreeAgentsFilterSelector.getScoringPeriodIds])
  static getSelectedScoringPeriodIds(ids: { [id: string]: boolean }): string[] {
    return Object.keys(ids).filter(id => ids[id]);
  }
}
