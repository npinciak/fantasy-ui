import { CurrentConditions } from './class';
import { IntervalsEntity, WeatherValues } from './interface/currentWeather.interface';

class WeatherStateModel {
  map!: CurrentWeatherMap;
  intervalsByGame!: { [id: number]: IntervalsEntity[] };
}

interface CurrentWeatherMap {
  [id: number]: WeatherValues;
}

interface CurrentConditionsMap {
  [id: number]: CurrentConditions;
}

const INITIAL_WEATHER_STATE: WeatherStateModel = {
  map: {},
  intervalsByGame: {},
};

export { WeatherStateModel, CurrentWeatherMap, CurrentConditionsMap, INITIAL_WEATHER_STATE };
