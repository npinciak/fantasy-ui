import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { BaseballGame } from '@mlb/class/game.class';

@Component({
  selector: 'app-stadium-weather',
  templateUrl: './stadium-weather.component.html',
  styleUrls: ['./stadium-weather.component.scss'],
})
export class StadiumWeatherComponent implements OnChanges {
  @Input() event: BaseballGame;

  constructor(readonly weatherFacade: WeatherFacade) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.event);
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

    // this.actions$.pipe(ofActionSuccessful(FetchWeather), take(1)).subscribe(res => {
    //   this.weather = this.weatherFacade.weatherToGame(+res.payload.gameId);
    //   // console.log(this.weather)
    // });
  }
}
