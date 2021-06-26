import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentWeather', () => {
    it('should fetch current conditions', () => {

      const spy = spyOn(service, 'currentWeather').and.callThrough();

      service.currentWeather('40.7128,74.0060').subscribe(res => {
        expect(res).toEqual(MOCK_DATA.WEATHER_CURRENT_CONDITIONS);
      });

      expect(spy).toHaveBeenCalledTimes(1);

      const req = httpTestingController.expectOne(MOCK_DATA.CLIMACELL_REQUEST);

      expect(req.request.method).toBe('GET');

      req.flush(MOCK_DATA.WEATHER_CURRENT_CONDITIONS);
    });

  });

});
