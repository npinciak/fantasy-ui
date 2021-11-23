import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { WIND_MAP } from '@app/espn/weather/weather/models/maps/windDir.map';

@Component({
  selector: 'app-stadium-weather',
  templateUrl: './stadium-weather.component.html',
  styleUrls: ['./stadium-weather.component.scss'],
})
export class StadiumWeatherComponent implements OnChanges {
  @Input() event: any;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly WIND_MAP = WIND_MAP;

  constructor(readonly weatherFacade: WeatherFacade) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'event':
            break;
          default:
            break;
        }
      }
    }
  }
}
