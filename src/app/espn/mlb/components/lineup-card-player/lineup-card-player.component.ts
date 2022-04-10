import { Component, Input } from '@angular/core';
import { InjuryStatusType } from '@app/espn/models/injury.model';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card-player',
  templateUrl: './lineup-card-player.component.html',
  styleUrls: ['./lineup-card-player.component.scss'],
})
export class LineupCardPlayerComponent {
  @Input() player: BaseballPlayer;

  readonly InjuryStatusType = InjuryStatusType;

  constructor() {}
}
