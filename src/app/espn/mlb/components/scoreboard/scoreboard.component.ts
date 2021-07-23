import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { BaseballGame } from '@app/espn/mlb/class/baseballGame.class';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() events: BaseballGame[];

  constructor(readonly weatherFacade: WeatherFacade) {}
}
