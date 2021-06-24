export class WeatherAction {
  static readonly type = '[Weather] Add item';
  constructor(public payload: string) { }
}
