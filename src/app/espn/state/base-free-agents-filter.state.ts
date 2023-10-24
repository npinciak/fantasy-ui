import { Injectable } from '@angular/core';
import { IdsPayload } from '@app/@shared/generic-selected-state/generic-selected.model';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import {
  IBaseFreeAgentsFilterActionsClass,
  IBaseFreeAgentsFilterMetaData,
  IBaseFreeAgentsFilterStateModel,
  INITIAL_STATE,
} from './base-free-agents-filter/base-free-agents-filter.model';
import { toggleByField } from './base-free-agents-filter/base-free-agents-filter.operators';

export interface IBaseFreeAgentFilterState {
  new (...args: any[]): any;
}

export function BaseFreeAgentsFilterState({
  actionHandler,
}: {
  actionHandler: IBaseFreeAgentsFilterActionsClass;
}): IBaseFreeAgentFilterState {
  @State<IBaseFreeAgentsFilterStateModel>({
    name: 'espnFreeAgentsFilterBaseState',
    defaults: INITIAL_STATE,
  })
  @Injectable()
  class FreeAgentsFilterBaseState {
    public static actionHandler = actionHandler;

    @Action(actionHandler.ToggleAvailabilityStatus)
    toggleAvailabilityStatus({ setState }: StateContext<IBaseFreeAgentsFilterStateModel>, { payload: { ids } }: { payload: IdsPayload }) {
      setState(toggleByField('selectedAvailabilityStatus', ids));
    }

    @Action(actionHandler.ToggleLineupSlotIds)
    toggleLineupSlotIds({ setState }: StateContext<IBaseFreeAgentsFilterStateModel>, { payload: { ids } }: { payload: IdsPayload }) {
      setState(toggleByField('selectedLineupSlotIds', ids));
    }

    @Action(actionHandler.ToggleTeamIds)
    toggleTeamIds({ setState }: StateContext<IBaseFreeAgentsFilterStateModel>, { payload: { ids } }: { payload: IdsPayload }) {
      setState(toggleByField('selectedTeamIds', ids));
    }

    @Action(actionHandler.ToggleScoringPeriodIds)
    toggleScoringPeriodIds({ setState }: StateContext<IBaseFreeAgentsFilterStateModel>, { payload: { ids } }: { payload: IdsPayload }) {
      setState(toggleByField('selectedScoringPeriodIds', ids));
    }

    @Action(actionHandler.SetMetaData)
    setMetaData(
      { setState }: StateContext<IBaseFreeAgentsFilterStateModel>,
      {
        payload: { metaData },
      }: {
        payload: { metaData: IBaseFreeAgentsFilterMetaData };
      }
    ) {
      const { sortStatId, sortDirection, currentPageIndex, currentPageSize } = metaData;

      const metaDataPatch = patch<IBaseFreeAgentsFilterStateModel['metaData']>({
        sortStatId,
        sortDirection,
        currentPageIndex,
        currentPageSize,
      });

      setState(patch<IBaseFreeAgentsFilterStateModel>({ metaData: metaDataPatch }));
    }
  }
  return FreeAgentsFilterBaseState;
}
