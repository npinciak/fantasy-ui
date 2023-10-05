import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';

import { patch } from '@ngxs/store/operators';
import { DfsSlateAttributesStateModel, INITIAL_STATE } from '../models/dfs-slate-attr.model';

@State<DfsSlateAttributesStateModel>({
  name: DfsSlateAttributes.stateName,
  defaults: INITIAL_STATE,
})
@Injectable()
export class DfsSlateAttributesState {
  /**
   * @deprecated user selectedSlateConfiguration instead
   */
  @Action(DfsSlateAttributes.SetSlateId)
  setSlate({ setState }: StateContext<DfsSlateAttributesStateModel>, { payload: { slate } }: { payload: { slate: string } }) {
    setState(patch<DfsSlateAttributesStateModel>({ slate }));
  }

  /**
   * @deprecated user selectedSlateConfiguration instead
   */
  @Action(DfsSlateAttributes.SetSite)
  setSite({ setState }: StateContext<DfsSlateAttributesStateModel>, { payload: { site } }: { payload: { site: string } }) {
    setState(patch<DfsSlateAttributesStateModel>({ site }));
  }
}
