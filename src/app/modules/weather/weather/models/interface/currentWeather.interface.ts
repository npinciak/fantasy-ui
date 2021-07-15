export interface CurrentWeather {
  data: Data;
}
export interface Data {
  timelines?: TimelinesEntity[] | null;
}
export interface TimelinesEntity {
  timestep: string;
  startTime: string;
  endTime: string;
  intervals?: IntervalsEntity[] | null;
}
export interface IntervalsEntity {
  startTime: string;
  values: WeatherValues;
}
export interface WeatherValues {
  precipitationIntensity: number;
  precipitationType: number;
  precipitationProbability: number;
  temperatureApparent: number;
  temperature: number;
  humidity: number;
  dewPoint: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  weatherCode: number;
}
