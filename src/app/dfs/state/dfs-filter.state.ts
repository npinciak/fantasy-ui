import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { DfsFilterActions } from '../actions/dfs-filter.actions';
import { DfsFilterStateModel, INITIAL_STATE } from '../models/dfs-filter.model';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

@State<DfsFilterStateModel>({
  name: DfsFilterActions.stateName,
  defaults: INITIAL_STATE,
})
@Injectable()
export class DfsFilterState {
  @Action(DfsFilterActions.SetTeam)
  setTeam({ setState }: StateContext<DfsFilterStateModel>, { payload: { team } }: { payload: { team: string | null } }) {
    setState(patch<DfsFilterStateModel>({ team }));
  }

  @Action(DfsFilterActions.SetName)
  setName({ setState }: StateContext<DfsFilterStateModel>, { payload: { name } }: { payload: { name: string | null } }) {
    setState(patch<DfsFilterStateModel>({ name }));
  }

  @Action(DfsFilterActions.SetPosition)
  setPosition({ setState }: StateContext<DfsFilterStateModel>, { payload: { position } }: { payload: { position: string | null } }) {
    setState(patch<DfsFilterStateModel>({ position }));
  }

  @Action(DfsFilterActions.SetProjectionType)
  setProjectionType(
    { setState }: StateContext<DfsFilterStateModel>,
    { payload: { projectionType } }: { payload: { projectionType: GridIronProjectionType } }
  ) {
    setState(patch<DfsFilterStateModel>({ projectionType }));
  }

  @Action(DfsFilterActions.SetXChartAxis)
  setXChartAxis({ setState }: StateContext<DfsFilterStateModel>, { payload: { xChartAxis } }: { payload: { xChartAxis: string | null } }) {
    setState(patch<DfsFilterStateModel>({ xChartAxis }));
  }

  @Action(DfsFilterActions.SetYChartAxis)
  setYChartAxis({ setState }: StateContext<DfsFilterStateModel>, { payload: { yChartAxis } }: { payload: { yChartAxis: string | null } }) {
    setState(patch<DfsFilterStateModel>({ yChartAxis }));
  }

}
