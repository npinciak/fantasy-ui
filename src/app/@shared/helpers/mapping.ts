import { CurrentConditions } from '@espn/weather/weather/models/class';
import { WeatherValues } from '@espn/weather/weather/models/interface/currentWeather.interface';

const stadiumConditionsMap = (conditions: { [id: number]: WeatherValues }) => {
  if (Object.values(conditions).length === 0) {
    return {};
  }

  const conditionsMap: { [id: number]: CurrentConditions } = {};

  for (const [key, val] of Object.entries(conditions)) {
    conditionsMap[key] = new CurrentConditions(val);
  }

  return conditionsMap;
};

export { stadiumConditionsMap };
