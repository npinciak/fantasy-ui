import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsWeather } from '../actions/dfs-weather.actions';

@State({ name: DfsWeather.stateName })
@Injectable()
export class DfsWeatherState extends GenericState({
  idProperty: 'id',
  addOrUpdate: DfsWeather.AddOrUpdate,
  clearAndAdd: DfsWeather.ClearAndAdd,
}) {}
