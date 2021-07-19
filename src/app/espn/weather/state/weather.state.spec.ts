import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { WeatherState } from './weather.state';
import { FetchWeather, WeatherAction } from '../actions/weather.actions';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from '../weather.service';
import { Game } from '@mlb/class/game.class';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { MockWeatherState } from './weather.state.mock';

describe('Weather actions', () => {
  let store: Store;
  let httpTestingController: HttpTestingController;
  let service: WeatherService;
  let state: WeatherState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([WeatherState])],
      providers: [WeatherService],
    }).compileComponents();

    store = TestBed.inject(Store);
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
    state = TestBed.inject(WeatherState);
  });

  it('should create an action and add an item', () => {
    // store.dispatch(new WeatherAction('item-1'));
    // store.select(state => state.weather.items).subscribe((items: string[]) => {
    //   expect(items).toEqual(jasmine.objectContaining(['item-1']));
    // });
  });

  describe('@Action fetchWeather', () => {
    it('should make http call', () => {
      const spy = spyOn(service, 'currentWeather').and.callThrough();

      service.currentWeather('40.7128,74.0060').subscribe(res => {
        expect(res).toEqual(jasmine.objectContaining(MOCK_DATA.WEATHER_CURRENT_CONDITIONS));
      });

      expect(spy).toHaveBeenCalledTimes(1);

      const req = httpTestingController.expectOne(MOCK_DATA.CLIMACELL_REQUEST);

      expect(req.request.method).toBe('GET');

      req.flush(MOCK_DATA.WEATHER_CURRENT_CONDITIONS);

      httpTestingController.verify();
    });

    it('should not make http call', () => {
      // const mockState = MockWeatherState;
      // const game = MOCK_DATA.GAME;
      // const spy = spyOn(state, 'fetchWeather').and.callThrough();
      // const serviceSpy = spyOn(service, 'currentWeather').and.callThrough();
      // store.dispatch(new FetchWeather(game[401228076]));
      // expect(spy).toHaveBeenCalled();
      // expect(serviceSpy).toHaveBeenCalled();
      // httpTestingController.verify();
    });
  });
});
