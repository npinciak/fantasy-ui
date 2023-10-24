import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsWeatherActions } from '../actions/dfs-weather.actions';

@State({ name: DfsWeatherActions.stateName })
@Injectable()
export class DfsWeatherState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsWeatherActions,
}) {}
