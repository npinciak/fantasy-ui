import { Injectable } from '@angular/core';
import { stadiumConditionsMap } from '@app/@shared/helpers/mapping';
import { entityMap, patchMap } from '@app/@shared/operators';
import { Game } from '@mlb/class/game.class';
import { MlbStateModel } from '@mlb/state/mlb-state.model';
import { GameMap } from '@app/espn/mlb/state/mlb-state.model';
import { MlbState } from '@app/espn/mlb/state/mlb.state';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { CurrentConditions } from '../weather/models/class';
import { WeatherValues } from '../weather/models/interface/currentWeather.interface';
import { FetchWeather, WeatherAction } from '../actions/weather.actions';
import { CurrentConditionsMap, CurrentWeatherMap, INITIAL_WEATHER_STATE, WeatherStateModel } from '../weather/models/weather.state.model';

@State<WeatherStateModel>({
  name: 'weather',
  defaults: INITIAL_WEATHER_STATE,
})
@Injectable()
export class WeatherState {
  constructor(private service: WeatherService) {}

  @Selector()
  static getState(state: WeatherStateModel) {
    return state;
  }

  @Selector()
  static gameWeather(state: WeatherStateModel) {
    return state.map;
  }

  @Action(FetchWeather)
  async fetchWeather(ctx: StateContext<WeatherStateModel>, { payload }: FetchWeather): Promise<void> {
    const gameExists = ctx.getState().map.hasOwnProperty(payload.gameId);

    if (gameExists) {
      console.log(`!---- Weather for ${payload.gameId} already in state, retrieving cache ----!`);
      return;
    } else {
      const conditions = await this.service.currentWeather(payload.location.latLng).toPromise();

      const weatherValues = conditions.data.timelines[0].intervals[0].values;

      const map = { ...ctx.getState().map };
      map[payload.gameId] = weatherValues;

      ctx.patchState({ map });
    }

    // const map = {};
    // map[payload.gameId] = weatherValues;

    // // const gameToConditionsMap: { [id: number]: WeatherValues } = {};

    // // gameToConditionsMap[payload.gameId] = entityMap(weatherValues);

    // patchMap([weatherValues]);
    // // patchMap(weatherValues, payload => payload.gameId);

    // map[payload.gameId] = weatherValues;
  }
}
