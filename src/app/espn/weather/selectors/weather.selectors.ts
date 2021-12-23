import { stadiumConditionsMap } from '@app/@shared/helpers/mapping';
import { Selector } from '@ngxs/store';
import { WeatherState } from '../state/weather.state';
import { CurrentConditions } from '../weather/models/class';
import { CurrentConditionsMap, CurrentWeatherMap } from '../weather/models/weather.state.model';

export class WeatherSelector {
  @Selector([WeatherState.gameWeather])
  static isEmpty(gameWeather: CurrentWeatherMap): boolean {
    return Object.values(gameWeather).length === 0;
  }

  @Selector([WeatherState.gameWeather])
  static selectStadiumCurrentWeather(gameWeather: CurrentWeatherMap): CurrentConditionsMap {
    return stadiumConditionsMap(gameWeather);
  }

  @Selector([WeatherSelector.selectStadiumCurrentWeather])
  static selectWeatherByGameId(currentConditions: CurrentConditionsMap): (id: number) => CurrentConditions {
    return (id: number) => currentConditions[id];
  }

  @Selector([WeatherState.gameWeather])
  static weatherByGameIdExists(gameWeather: CurrentWeatherMap): (id: number) => boolean {
    return (id: number) => gameWeather.hasOwnProperty(id);
  }
}
