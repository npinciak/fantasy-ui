import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../@shared/services/api.service';
import { CurrentWeather } from './weather/models/interface/currentWeather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseUri = 'https://api.tomorrow.io/v4/timelines';

  constructor(private api: ApiService) {}

  currentWeather = (coordinates: string) =>
    this.api.get<CurrentWeather>(this.baseUri, {
      headers: this.headers,
      params: this.queryParams.append('location', coordinates),
    });

  private get headers() {
    let headers = new HttpHeaders();
    headers = headers.append('apiKey', environment.climaCellKey);
    return headers;
  }

  private get queryParams() {
    let params = new HttpParams();
    params = params.append('fields', this.forecastFields);
    params = params.append('timesteps', 'current');
    params = params.append('units', 'imperial');
    params = params.append('timezone', 'est');
    return params;
  }

  private get forecastFields() {
    // eslint-disable-next-line max-len
    return 'precipitationIntensity,precipitationType,precipitationProbability,temperatureApparent,temperature,humidity,dewPoint,windSpeed,windGust,windDirection,weatherCode';
  }
}
