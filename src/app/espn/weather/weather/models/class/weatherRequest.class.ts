class WeatherRequest {
  private _location: string;
  private _startTime: string;
  private _endTime: string;

  constructor(location: string, startTime: string, endTime: string) {
    this._location = location;
    this._startTime = startTime;
    this._endTime = endTime;
  }

  get location() {
    return this._location;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }
}

export { WeatherRequest };
