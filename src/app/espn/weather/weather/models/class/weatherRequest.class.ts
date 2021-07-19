class WeatherRequest {
  private _location: string;
  private _startTime: Date;
  private _endTime: Date;

  constructor(location: string, startTime: Date, endTime: Date) {
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
