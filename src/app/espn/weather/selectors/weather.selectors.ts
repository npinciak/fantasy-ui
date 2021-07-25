import { stadiumConditionsMap } from '@app/@shared/helpers/mapping';
import { BaseballGame } from '@app/espn/mlb/class/baseballGame.class';
import { MlbGameSelectors } from '@app/espn/mlb/selectors/mlb-game.selectors';
import { BaseballGameMap, GameMap } from '@app/espn/mlb/state/mlb-state.model';
import { Selector } from '@ngxs/store';
import { WeatherState } from '../state/weather.state';
import { CurrentConditions } from '../weather/models/class';
import { WeatherValues } from '../weather/models/interface/currentWeather.interface';
import { CurrentConditionsMap, CurrentWeatherMap, WeatherStateModel } from '../weather/models/weather.state.model';

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

  @Selector([WeatherSelector.selectWeatherByGameId, MlbGameSelectors.eventToGameMap])
  static weatherToGame(selectWeatherByGameId: (id: number) => CurrentConditions, game: BaseballGameMap): (id: number) => BaseballGame {
    return (id: number) => {
      const weather = selectWeatherByGameId(id);
      game[id].currentConditions = weather;
      return game[id];
    };
  }

  @Selector([WeatherState.gameWeather])
  static weatherByGameIdExists(gameWeather: CurrentWeatherMap): (id: number) => boolean {
    return (id: number) => gameWeather.hasOwnProperty(id);
  }
}
