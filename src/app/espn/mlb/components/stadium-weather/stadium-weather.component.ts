import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { FetchWeather } from '@espn/weather/actions/weather.actions';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Game } from '@mlb/class/game.class';

@Component({
  selector: 'app-stadium-weather',
  templateUrl: './stadium-weather.component.html',
  styleUrls: ['./stadium-weather.component.scss'],
})
export class StadiumWeatherComponent implements OnChanges {
  @Input() event: Game;

  // = MOCK_DATA.GAME[401228076];

  constructor(readonly weatherFacade: WeatherFacade, private actions$: Actions) {
    // this.event.currentConditions = MOCK_DATA.CURRENT_CONDITIONS_CLASS;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.event);
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'event':
            {
              console.log(this.event);
            }
            break;
          default:
            break;
        }
      }
    }

    // this.actions$.pipe(ofActionSuccessful(FetchWeather), take(1)).subscribe(res => {
    //   this.weather = this.weatherFacade.weatherToGame(+res.payload.gameId);
    //   // console.log(this.weather)
    // });
  }
}
