import { Component, Input } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { PLAYER_INJURY_STATUS } from 'sports-ui-sdk';

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
    return this.player?.injuryStatus === PLAYER_INJURY_STATUS.DTD;
  }
}
