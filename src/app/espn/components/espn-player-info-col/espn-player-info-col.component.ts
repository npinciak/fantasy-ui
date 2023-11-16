import { Component } from '@angular/core';

import { FootballPlayer } from '@app/espn-fantasy-football/models/football-player.model';
import { EspnPlayerComponent } from '../espn-player/espn-player.component';
import { BaseballPlayer } from '@app/espn-fantasy-baseball/models/baseball-player.model';

@Component({
  selector: 'app-espn-player-info-col',
  templateUrl: './espn-player-info-col.component.html',
})
export class EspnPlayerInfoColComponent extends EspnPlayerComponent<BaseballPlayer | FootballPlayer> {}
