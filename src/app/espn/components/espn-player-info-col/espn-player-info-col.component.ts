import { Component } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnPlayerComponent } from '../espn-player/espn-player.component';

@Component({
  selector: 'app-espn-player-info-col',
  templateUrl: './espn-player-info-col.component.html',
})
export class EspnPlayerInfoColComponent extends EspnPlayerComponent<PlayerEntity> {}
