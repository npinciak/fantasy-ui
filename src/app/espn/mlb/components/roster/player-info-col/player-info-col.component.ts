import { Component, Input } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { PlayerStatusType } from '@app/espn/models/injury.model';

@Component({
  selector: 'app-player-info-col',
  templateUrl: './player-info-col.component.html',
  styleUrls: ['player-info-col.component.scss'],
})
export class PlayerInfoColComponent {
  @Input() player: BaseballPlayer;
  constructor() {}

  get playerLabel() {
    return `${this.player.name}, ${this.player.team}`;
  }

  get isPlayerDayToDay() {
    return this.player?.injuryStatus === PlayerStatusType.DTD;
  }
}
