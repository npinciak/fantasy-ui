import { Component, Input } from '@angular/core';
import { BaseballPlayer } from '@mlb/class/player.class';

@Component({
  selector: 'app-player-info-col',
  templateUrl: './player-info-col.component.html',
})
export class PlayerInfoColComponent {
  @Input() player: BaseballPlayer;
  constructor() {}
}
