import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { DfsSelectedSlateConfigurationActions } from '../actions/dfs-selected-slate-configuration.actions';
import { DfsSelectedSlateConfigurationStateModel, INITIAL_STATE } from '../models/dfs-selected-slate-configuration.model';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

@State<DfsSelectedSlateConfigurationStateModel>({
  name: DfsSelectedSlateConfigurationActions.stateName,
  defaults: INITIAL_STATE,
})
@Injectable()
export class DfsSelectedSlateConfigurationState {
  @Action(DfsSelectedSlateConfigurationActions.SetSlateId)
  setSlateId(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { slateId } }: { payload: { slateId: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ slateId }));
  }

  @Action(DfsSelectedSlateConfigurationActions.SetSite)
  setSite(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { site } }: { payload: { site: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ site }));
  }

  @Action(DfsSelectedSlateConfigurationActions.SetPath)
  setPath(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { path } }: { payload: { path: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ path }));
  }

  @Action(DfsSelectedSlateConfigurationActions.SetSport)
  setSport(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { sport } }: { payload: { sport: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ sport }));
  }

  @Action(DfsSelectedSlateConfigurationActions.SetProjectionType)
  setProjectionType(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { projectionType } }: { payload: { projectionType: GridIronProjectionType } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ projectionType }));
  }
}
