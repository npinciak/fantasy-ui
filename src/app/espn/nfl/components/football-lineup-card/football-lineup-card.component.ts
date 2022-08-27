import { Component, Input } from '@angular/core';
import { PlayerStatusType } from '@app/espn/models/injury.model';
import { colorByPlayingStatus, matIconByPlayingStatus } from '@app/espn/models/playing-status.model';
import { FootballPlayer } from '../../models/football-player.model';

@Component({
  selector: 'app-football-lineup-card',
  templateUrl: './football-lineup-card.component.html',
  styleUrls: ['./football-lineup-card.component.scss'],
})
export class FootballLineupCardComponent {
  @Input() title: string = 'Lineup';
  @Input() lineup: FootballPlayer[];
  @Input() points: number;
  @Input() week: number;

  readonly matIconByPlayingStatus = matIconByPlayingStatus;
  readonly colorByPlayingStatus = colorByPlayingStatus;
  readonly InjuryStatusType = PlayerStatusType;

  constructor() {}

  playerLabel(player: FootballPlayer) {
    return `${player.name}, ${player.team}, ${player.lineupSlot}`;
  }

  // get isPlayerDayToDay() {
  //   return this.player?.injuryStatus === InjuryStatusType.DTD;
  // }
}
