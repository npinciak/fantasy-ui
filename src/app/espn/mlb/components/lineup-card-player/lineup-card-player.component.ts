import { Component, Input } from '@angular/core';
import { PlayerStatusType } from '@app/espn/models/injury.model';
import { colorByPlayingStatus, matIconByPlayingStatus } from '@app/espn/models/playing-status.model';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card-player',
  templateUrl: './lineup-card-player.component.html',
  styleUrls: ['./lineup-card-player.component.scss'],
})
export class LineupCardPlayerComponent {
  @Input() player: BaseballPlayer;

  readonly matIconByPlayingStatus = matIconByPlayingStatus;
  readonly colorByPlayingStatus = colorByPlayingStatus;
  readonly InjuryStatusType = PlayerStatusType;

  constructor() {}

  get playerLabel() {
    return `${this.player.name}, ${this.player.team}, ${this.player.lineupSlot}`;
  }

  get isPlayerDayToDay() {
    return this.player?.injuryStatus === PlayerStatusType.DTD;
  }
}
