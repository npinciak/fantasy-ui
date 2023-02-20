import { Component } from '@angular/core';
import { EspnLineupCardComponent } from '@app/espn/components/espn-lineup-card/espn-lineup-card.component';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-baseball-lineup-card',
  templateUrl: './baseball-lineup-card.component.html',
})
export class BaseballLineupCardComponent extends EspnLineupCardComponent<BaseballPlayer> {}
