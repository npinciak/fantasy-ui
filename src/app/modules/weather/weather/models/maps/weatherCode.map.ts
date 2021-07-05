import { WeatherCode } from '../weather.enum';

/**
 * Weather codes defined by Tomorrow.io
 *
 * @description https://docs.tomorrow.io/reference/data-layers-overview
 */
const WEATHER_MAP = {
    [WeatherCode.Unknown]: 'Unknown',
    [WeatherCode.Clear]: 'Clear',
    [WeatherCode.Cloudy]: 'Cloudy',
    [WeatherCode.MostlyClear]: 'Mostly Clear',
    [WeatherCode.PartlyCloudy]: 'Partly Cloudy',
    [WeatherCode.MostlyCloudy]: 'Mostly Cloudy',
    [WeatherCode.Fog]: 'Fog',
    [WeatherCode.LightFog]: 'Light Fog',
    [WeatherCode.LightWind]: 'Light Wind',
    [WeatherCode.Wind]: 'Wind',
    [WeatherCode.StrongWind]: 'Strong Wind',
    [WeatherCode.Drizzle]: 'Drizzle',
    [WeatherCode.Rain]: 'Rain',
    [WeatherCode.LightRain]: 'Light Rain',
    [WeatherCode.HeavyRain]: 'Heavy Rain',
    [WeatherCode.Snow]: 'Snow',
    [WeatherCode.Flurries]: 'Flurries',
    [WeatherCode.LightSnow]: 'Light Snow',
    [WeatherCode.HeavySnow]: 'Heavy Snow',
    [WeatherCode.FreezingDrizzle]: 'Freezing Drizzle',
    [WeatherCode.FreezingRain]: 'Freezing Rain',
    [WeatherCode.LightFreezingRain]: 'Light Freezing Rain',
    [WeatherCode.HeavyFreezingRain]: 'Heavy Freezing Rain',
    [WeatherCode.IcePellets]: 'Ice Pellets',
    [WeatherCode.HeavyIcePellets]: 'Heavy Ice Pellets',
    [WeatherCode.LightIcePellet]: 'Light Ice Pellet',
    [WeatherCode.Thunderstorm]: 'Thunderstorm'
};

export { WEATHER_MAP };
