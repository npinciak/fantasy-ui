import { Injectable } from '@angular/core';
import { stadiumConditionsMap } from '@app/@shared/helpers/mapping';
import { entityMap } from '@app/@shared/operators';
import { Game } from '@app/modules/espn/models/mlb/class/game.class';
import { MlbStateModel } from '@app/modules/espn/store/mlb';
import { MlbState } from '@app/modules/espn/store/mlb/mlb.state';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { CurrentConditions } from '../weather/models/class';
import { WeatherValues } from '../weather/models/interface/currentWeather.interface';
import { FetchWeather, WeatherAction } from './weather.actions';

export class WeatherStateModel {
  items: string[];
  currentWeather: { [id: number]: WeatherValues };
}

const defaults = {
  items: [],
  currentWeather: {}
};

@State<WeatherStateModel>({
  name: 'weather',
  defaults
})

@Injectable()
export class WeatherState {
  constructor(private service: WeatherService) { }

  @Selector()
  static getState(state: WeatherStateModel) {
    return state;
  }

  @Selector([WeatherState.getState])
  static currentWeather(state: WeatherStateModel) {
    return stadiumConditionsMap(state.currentWeather);
  }

  @Selector([WeatherState.currentWeather, MlbState.gamesMap])
  static weatherToGame(_: WeatherStateModel,
    weather: { [id: number]: CurrentConditions },
    game: { [id: number]: Game }) {

    return (id: number) => {
      game[id].currentConditions = weather[id];
      return game[id];
    };
  }

  @Selector()
  static selectWeatherByGameId(state: WeatherStateModel): (id: number) => WeatherValues {
    return (id: number) => state.currentWeather[id];
  }

  @Action(FetchWeather)
  fetchWeather(ctx: StateContext<WeatherStateModel>, { payload }: FetchWeather) {
    if (ctx.getState().currentWeather.hasOwnProperty(payload.gameId)) {
      console.log('Data already in state, retrieving cache');
      return;
    }

    return this.service.currentWeather(payload.location).pipe(
      tap((res) => {

        const currentWeather = {};
        currentWeather[payload.gameId] = res.data.timelines[0].intervals[0].values;

        ctx.patchState({
          items: [],
          currentWeather
        });
      })
    );
  }
}
