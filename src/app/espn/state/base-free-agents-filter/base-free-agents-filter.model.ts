import { IdsPayloadActionClass } from '@app/@shared/generic-selected-state/generic-selected-state.m';
import { GenericSetActionClass } from '@app/@shared/generic-state/generic-state.m';
import { PLAYER_AVAILABILITY_STATUS } from '@sports-ui/ui-sdk/espn-client';

export const INITIAL_STATE: IBaseFreeAgentsFilterStateModel = {
  selectedAvailabilityStatus: {
    [PLAYER_AVAILABILITY_STATUS.FreeAgent]: true,
  },
  selectedLineupSlotIds: {},
  selectedTeamIds: {},
  selectedScoringPeriodIds: {},
  filterInjured: false,
  topScoringPeriodIds: {},
  sortStatId: {},
  metaData: {
    sortStatId: '',
    sortDirection: 'desc',
    currentPageSize: 100,
    currentPageIndex: 0,
  },
};

export interface IBaseFreeAgentsFilterStateModel {
  // selected state properties
  selectedAvailabilityStatus: { [id: string]: boolean };
  selectedLineupSlotIds: { [id: number]: boolean };
  selectedTeamIds: { [id: number]: boolean };
  selectedScoringPeriodIds: { [id: string]: boolean };
  filterInjured: boolean;
  topScoringPeriodIds: { [id: string]: boolean };
  sortStatId: { [id: string]: boolean };
  metaData: IBaseFreeAgentsFilterMetaData;
}

export interface IBaseFreeAgentsFilterMetaData {
  sortStatId: string;
  sortDirection: string;
  currentPageSize: number;
  currentPageIndex: number;
}

export interface IBaseFreeAgentsFilterActionsClass {
  new (...args: any[]): any;
  stateName: string;
  ToggleAvailabilityStatus: IdsPayloadActionClass;
  ToggleLineupSlotIds: IdsPayloadActionClass;
  ToggleTeamIds: IdsPayloadActionClass;
  ToggleScoringPeriodIds: IdsPayloadActionClass;
  SetMetaData: GenericSetActionClass<{ metaData: IBaseFreeAgentsFilterMetaData }>;
}
