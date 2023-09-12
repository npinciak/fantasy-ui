import { Component } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { FootballPlayer } from '@app/espn/nfl/models/football-player.model';

import { EspnPlayerComponent } from '../espn-player/espn-player.component';

@Component({
  selector: 'app-espn-player-info-col',
  templateUrl: './espn-player-info-col.component.html',
})
export class EspnPlayerInfoColComponent extends EspnPlayerComponent<BaseballPlayer | FootballPlayer> {}
