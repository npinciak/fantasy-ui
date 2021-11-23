import { Component, Input, OnInit } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { BaseballGame } from '@app/espn/mlb/class/baseballGame.class';
import { WeatherRequest } from '@app/espn/weather/weather/models/class';
import { MlbEvent } from '../../models/mlb-event.model';

@Component({
  selector: 'app-scoreboard-event',
  templateUrl: './scoreboard-event.component.html',
  styleUrls: ['./scoreboard-event.component.scss'],
})
export class ScoreboardEventComponent implements OnInit {
  @Input() event: MlbEvent;

  constructor(readonly weatherFacade: WeatherFacade) {}

  ngOnInit(): void {}

  // fetchWeatherForGame(event: BaseballGame) {
  //   const weatherRequest = new WeatherRequest(event.location.latLng, event.gameDate.isoStartTime, event.gameDate.isoEstEndTime);

  //   this.weatherFacade.fetchWeather(Number(event.gameId), weatherRequest);
  // }
}
