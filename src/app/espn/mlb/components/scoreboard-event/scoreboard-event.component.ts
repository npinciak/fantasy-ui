import { Component, Input, OnInit } from '@angular/core';
import { WeatherFacade } from '@espn/weather/facade/weather.facade';
import { BaseballGame } from '@mlb/class/game.class';

@Component({
  selector: 'app-scoreboard-event',
  templateUrl: './scoreboard-event.component.html',
  styleUrls: ['./scoreboard-event.component.scss'],
})
export class ScoreboardEventComponent implements OnInit {
  @Input() event: BaseballGame;

  constructor(readonly weatherFacade: WeatherFacade) {}

  ngOnInit(): void {}
}
