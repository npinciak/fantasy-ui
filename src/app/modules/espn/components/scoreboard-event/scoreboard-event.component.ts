import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/mlb/class/game.class';

@Component({
  selector: 'app-scoreboard-event',
  templateUrl: './scoreboard-event.component.html',
  styleUrls: ['./scoreboard-event.component.scss'],
})
export class ScoreboardEventComponent implements OnInit {
  @Input() event: Game;

  constructor() {}

  ngOnInit(): void {}

  getWeather(...param) {}
}
