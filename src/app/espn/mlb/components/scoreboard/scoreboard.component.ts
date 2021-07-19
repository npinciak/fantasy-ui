import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { Game } from '@mlb/class/game.class';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() events: Game[];

  constructor(readonly weatherFacade: WeatherFacade) {}
}
