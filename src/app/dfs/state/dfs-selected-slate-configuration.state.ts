import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { DfsSelectedSlateConfiguration } from '../actions/dfs-selected-slate-configuration.actions';

export class DfsSelectedSlateConfigurationStateModel {
  slateId: string | null;
  site: string | null;
  path: string | null;
  sport: string | null;
}

export const INITIAL_STATE: DfsSelectedSlateConfigurationStateModel = {
  slateId: null,
  site: null,
  path: null,
  sport: null,
};

@State<DfsSelectedSlateConfigurationStateModel>({
  name: DfsSelectedSlateConfiguration.stateName,
  defaults: INITIAL_STATE,
})
@Injectable()
export class DfsSelectedSlateConfigurationState {
  @Action(DfsSelectedSlateConfiguration.SetSlateId)
  setSlateId(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { slateId } }: { payload: { slateId: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ slateId }));
  }

  @Action(DfsSelectedSlateConfiguration.SetSite)
  setSite(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { site } }: { payload: { site: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ site }));
  }

  @Action(DfsSelectedSlateConfiguration.SetPath)
  setPath(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { path } }: { payload: { path: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ path }));
  }

  @Action(DfsSelectedSlateConfiguration.SetSport)
  setSport(
    { setState }: StateContext<DfsSelectedSlateConfigurationStateModel>,
    { payload: { sport } }: { payload: { sport: string | null } }
  ) {
    setState(patch<DfsSelectedSlateConfigurationStateModel>({ sport }));
  }
}
