import { BaseballGame } from '@mlb/class/game.class';

export class WeatherAction {
  static readonly type = '[Weather] Add item';
  constructor(public payload: string) {}
}

export class FetchWeather {
  static readonly type = '[Weather] Fetch Weather';
  constructor(public payload: BaseballGame) {}
}
