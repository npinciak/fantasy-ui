import { Component } from '@angular/core';
import { FootballPlayer } from '@app/espn/nfl/models/football-player.model';
import { EspnPlayerComponent } from '../espn-player/espn-player.component';

@Component({
  selector: 'app-espn-player-info-col',
  templateUrl: './espn-player-info-col.component.html',
  styleUrls: ['./espn-player-info-col.component.scss'],
})
export class EspnPlayerInfoColComponent extends EspnPlayerComponent<FootballPlayer> {}
