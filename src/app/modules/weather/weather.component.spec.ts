import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { gameMap } from '@app/@shared/helpers/mapping';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsModule, Store } from '@ngxs/store';
import { Game } from '../espn/models/mlb/class/game.class';
import { MockGame } from '../espn/models/mlb/mocks';
import { FetchWeather } from './store/weather.actions';
import { WeatherState } from './store/weather.state';

import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  let httpTestingController: HttpTestingController;
  let service: WeatherService;
  let state: WeatherState;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        MatListModule,
        NgxsDispatchPluginModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([WeatherState]),
      ],
      declarations: [WeatherComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
    store = TestBed.inject(Store);
    state = TestBed.inject(WeatherState);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
