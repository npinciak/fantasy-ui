import { MOCK_DATA_CLIMA, MOCK_DATA_ESPN } from '@app/@shared/helpers/testConfigs';
import { WeatherStateModel } from '../weather/models/weather.state.model';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MockWeatherState: WeatherStateModel = {
  map: {
    [Number(MOCK_DATA_ESPN.ESPN_EVENT.id)]: MOCK_DATA_CLIMA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values,
  },
};

export { MockWeatherState };
