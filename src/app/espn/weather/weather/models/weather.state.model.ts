import { CurrentConditions } from './class';
import { WeatherValues } from './interface/currentWeather.interface';

class WeatherStateModel {
  currentWeather: CurrentWeatherMap;
}

interface CurrentWeatherMap {
  [id: number]: WeatherValues;
}

interface CurrentConditionsMap {
  [id: number]: CurrentConditions;
}

const INITIAL_WEATHER_STATE = {
  currentWeather: {},
};

export { WeatherStateModel, CurrentWeatherMap, CurrentConditionsMap, INITIAL_WEATHER_STATE };
