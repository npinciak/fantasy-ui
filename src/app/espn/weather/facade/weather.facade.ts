import { Injectable } from '@angular/core';
import { Game } from '@mlb/class/game.class';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WeatherValues } from '../weather/models/interface/currentWeather.interface';
import { FetchWeather } from '../actions/weather.actions';
import { WeatherState } from '../state/weather.state';
import { CurrentConditionsMap } from '../weather/models/weather.state.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacade {
  @Select(WeatherState.currentWeather) public currentWeather$: Observable<CurrentConditionsMap>;

  constructor(private store: Store) {}

  selectWeatherByGameId = (id: number) => this.store.selectSnapshot(WeatherState.selectWeatherByGameId)(id);
  weatherToGame = (id: number) => this.store.selectSnapshot(WeatherState.weatherToGame)(id);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() fetchWeather = (game: Game) => new FetchWeather(game);
}
