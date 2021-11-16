import { WeatherValues } from '../interface/currentWeather.interface';
import { PRECIPITATION_MAP } from '../maps/precipCode.map';
import { WEATHER_MAP } from '../maps/weatherCode.map';
import { WeatherCode } from '../weather.enum';

class CurrentConditions {
  private _dataFields: WeatherValues;

  constructor(dataFields: WeatherValues) {
    this._dataFields = dataFields;
  }

  get weather() {
    return WEATHER_MAP[this._dataFields.weatherCode];
  }

  get temperature() {
    return this._dataFields.temperature;
  }

  get realFeel() {
    return this._dataFields.temperatureApparent;
  }

  get precipitation() {
    return PRECIPITATION_MAP[this._dataFields.precipitationType];
  }

  get chanceOf() {
    return this._dataFields.precipitationProbability;
  }

  get humidity() {
    return this._dataFields.humidity;
  }

  get chanceOfText() {
    if (PRECIPITATION_MAP[this._dataFields.precipitationType] === 'N/A') {
      return 'No precipitation';
    }

    return `Chance of ${PRECIPITATION_MAP[this._dataFields.precipitationType]}, ${this._dataFields.precipitationProbability}%`;
  }

  get weatherImg() {
    return `https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/${this.lowercaseWeatherCode}.svg`;
  }

  get wind() {
    return {
      direction: this._dataFields.windDirection,
      gust: this._dataFields.windGust,
      speed: this._dataFields.windSpeed,
      directionRotate: `rotate(${this._dataFields.windDirection}deg)`,
      degreeToCompass: Math.floor((this._dataFields.windDirection + 11.25) / 22.5),
    };
  }

  get dewPoint() {
    return this._dataFields.dewPoint;
  }

  private get lowercaseWeatherCode() {
    switch (this._dataFields.weatherCode) {
      case WeatherCode.MostlyClear:
      case WeatherCode.Clear:
      case WeatherCode.PartlyCloudy:
        return `${WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase()}_day`;
      case WeatherCode.LightRain:
        return `rain_light`;
      case WeatherCode.HeavyRain:
        return `rain_heavy`;
      default:
        break;
    }

    return WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase();
  }
}

export { CurrentConditions };
