/* eslint-disable @typescript-eslint/naming-convention */
enum PrecipitationCode {
  NA,
  Rain,
  Snow,
  FreezingRain,
  IcePellets,
}

enum WeatherCode {
  Unknown,
  Clear = 1000,
  Cloudy,
  MostlyClear = 1100,
  PartlyCloudy,
  MostlyCloudy,
  Fog = 2000,
  LightFog = 2100,
  LightWind = 3000,
  Wind,
  StrongWind,
  Drizzle = 4000,
  Rain,
  LightRain = 4200,
  HeavyRain,
  Snow = 5000,
  Flurries,
  LightSnow = 5100,
  HeavySnow,
  FreezingDrizzle = 6000,
  FreezingRain,
  LightFreezingRain = 6200,
  HeavyFreezingRain,
  IcePellets = 7000,
  HeavyIcePellets = 7101,
  LightIcePellet,
  Thunderstorm = 8000,
}

export { PrecipitationCode, WeatherCode };
