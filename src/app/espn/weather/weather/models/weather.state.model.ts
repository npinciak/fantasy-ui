import { CurrentConditions } from './class';
import { WeatherValues } from './interface/currentWeather.interface';

class WeatherStateModel {
  map!: CurrentWeatherMap;
}

interface CurrentWeatherMap {
  [id: number]: WeatherValues;
}

interface CurrentConditionsMap {
  [id: number]: CurrentConditions;
}

const INITIAL_WEATHER_STATE: WeatherStateModel = {
  map: {},
};

export { WeatherStateModel, CurrentWeatherMap, CurrentConditionsMap, INITIAL_WEATHER_STATE };
