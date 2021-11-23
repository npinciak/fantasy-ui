import { WeatherRequest } from '../weather/models/class';

export class WeatherAction {
  static readonly type = '[Weather] Add item';
  constructor(public payload: string) {}
}

export class FetchWeather {
  static readonly type = '[Weather] Fetch Weather';
  constructor(public payload: { gameId: number; request: WeatherRequest }) {}
}
