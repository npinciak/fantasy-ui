import { Component, EventEmitter, Output } from '@angular/core';
import { EspnLineupCardComponent } from '@app/espn/components/espn-lineup-card/espn-lineup-card.component';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card',
  templateUrl: './lineup-card.component.html',
  styleUrls: ['./lineup-card.component.scss'],
})
export class LineupCardComponent extends EspnLineupCardComponent<BaseballPlayer> {
  @Output() fetchPlayerDetails = new EventEmitter<BaseballPlayer>();

  showPlayerDetails(player: BaseballPlayer) {
    this.fetchPlayerDetails.emit(player);
  }
}
