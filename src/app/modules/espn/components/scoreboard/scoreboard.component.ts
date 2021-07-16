import { Component, Input } from '@angular/core';
import { Game } from '../../models/mlb/class/game.class';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() events: Game[];

  constructor() {}
}
