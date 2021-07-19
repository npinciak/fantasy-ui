import { Injectable } from '@angular/core';
import { stadiumConditionsMap } from '@app/@shared/helpers/mapping';
import { entityMap } from '@app/@shared/operators';
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

  @Selector([WeatherState.getState])
  static currentWeather(state: WeatherStateModel): CurrentConditionsMap {
    return stadiumConditionsMap(state.currentWeather);
  }

  @Selector([WeatherState.currentWeather, MlbState.eventToGame])
  static weatherToGame(_: WeatherStateModel, weather: CurrentConditionsMap, game: GameMap) {
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
  async fetchWeather(ctx: StateContext<WeatherStateModel>, { payload }: FetchWeather): Promise<void> {
    const gameExists = ctx.getState().currentWeather.hasOwnProperty(payload.gameId);

    if (gameExists) {
      console.log(`!---- Weather for ${payload.gameId} already in state, retrieving cache ----!`);
      return;
    }

    const conditions = await this.service.currentWeather(payload.location.latLng).toPromise();

    const currentWeather = {};
    currentWeather[payload.gameId] = conditions.data.timelines[0].intervals[0].values;
    ctx.patchState({ currentWeather });
  }
}
