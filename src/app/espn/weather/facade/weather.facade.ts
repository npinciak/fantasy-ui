import { Injectable } from '@angular/core';
import { BaseballGame } from '@app/espn/mlb/class/baseballGame.class';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ActionCompletion, Actions, ofActionCompleted, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WeatherValues } from '../weather/models/interface/currentWeather.interface';
import { FetchWeather } from '../actions/weather.actions';
import { WeatherState } from '../state/weather.state';
import { CurrentConditionsMap } from '../weather/models/weather.state.model';
import { WeatherSelector } from '../selectors/weather.selectors';
import { WeatherRequest } from '../weather/models/class';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacade {
  @Select(WeatherSelector.isEmpty) public isEmpty$: Observable<boolean>;
  @Select(WeatherState.gameWeather) public gameWeather$: Observable<CurrentConditionsMap>;

  constructor(private store: Store, private actions$: Actions) {}

  public onWeatherChanged$(): Observable<ActionCompletion> {
    return this.actions$.pipe(ofActionSuccessful(FetchWeather));
  }

  weatherByGameIdExists = (id: number) => this.store.selectSnapshot(WeatherSelector.weatherByGameIdExists)(id);
  selectWeatherByGameId = (id: number) => this.store.selectSnapshot(WeatherSelector.selectWeatherByGameId)(id);
  weatherToGame = (id: number) => this.store.selectSnapshot(WeatherSelector.weatherToGame)(id);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() fetchWeather = (gameId: number, request: WeatherRequest) => new FetchWeather({ gameId, request });
}
