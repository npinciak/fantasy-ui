import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { WeatherAction } from './weather.actions';

export class WeatherStateModel {
  public items: string[];
}

const defaults = {
  items: []
};

@State<WeatherStateModel>({
  name: 'weather',
  defaults
})
@Injectable()
export class WeatherState {
  @Action(WeatherAction)
  add({ getState, setState }: StateContext<WeatherStateModel>, { payload }: WeatherAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
