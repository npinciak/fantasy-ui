import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumWeatherComponent } from './stadium-weather.component';

describe('StadiumWeatherComponent', () => {
  let component: StadiumWeatherComponent;
  let fixture: ComponentFixture<StadiumWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadiumWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
