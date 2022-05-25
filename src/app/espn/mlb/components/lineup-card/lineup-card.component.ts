import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card',
  templateUrl: './lineup-card.component.html',
  styleUrls: ['./lineup-card.component.scss'],
})
export class LineupCardComponent {
  @Input() title: string = 'Lineup';
  @Input() lineup: BaseballPlayer[];
  @Output() fetchPlayerDetails = new EventEmitter<BaseballPlayer>();

  constructor() {}

  showPlayerDetails(player: BaseballPlayer) {
    this.fetchPlayerDetails.emit(player);
  }
}
