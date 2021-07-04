import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { WeatherStateModel } from './weather.state';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MockWeatherState: WeatherStateModel = {
    items: [],
    currentWeather: { [+MOCK_DATA.ESPN_EVENT.id]: MOCK_DATA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values }
};

export { MockWeatherState };
