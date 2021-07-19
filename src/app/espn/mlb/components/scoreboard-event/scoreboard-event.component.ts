import { Component, Input, OnInit } from '@angular/core';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { Game } from '@mlb/class/game.class';

@Component({
  selector: 'app-scoreboard-event',
  templateUrl: './scoreboard-event.component.html',
  styleUrls: ['./scoreboard-event.component.scss'],
})
export class ScoreboardEventComponent implements OnInit {
  @Input() event: Game;

  constructor(readonly weatherFacade: WeatherFacade) {}

  ngOnInit(): void {
    this.event.currentConditions = MOCK_DATA.CURRENT_CONDITIONS_CLASS;
    console.log(this.event);
  }

  fetchGameWeatherConditions(event: Game) {
    this.weatherFacade.fetchWeather(event);

    // this.weatherFacade.ga(Number(event.gameId));
  }
}
