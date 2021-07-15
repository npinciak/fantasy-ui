import { Component, Input } from '@angular/core';
import { Game } from '../../models/mlb/class/game.class';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() games: { [id: number]: Game };

  constructor() {}

  get gamesToArray() {
    if (this.games) {
      return Object.values(this.games).sort(
        (a, b) => a.gameDate.milli - b.gameDate.milli
      );
    }
    return [];
  }
}
