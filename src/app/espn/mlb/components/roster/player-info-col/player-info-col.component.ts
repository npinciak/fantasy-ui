import { Component, Input } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';

@Component({
  selector: 'app-player-info-col',
  templateUrl: './player-info-col.component.html',
})
export class PlayerInfoColComponent {
  @Input() player: BaseballPlayer;
  constructor() {}
}
