import { Component, Input } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  InjurySeverityByInjuryStatus,
  InjurySeverityColor,
  InjurySeverityColorByInjurySeverity,
  MatIconByEspnPlayerInjuryStatus,
  PlayerStatusAbbrevByInjuryStatusType,
} from '@app/espn/models/injury.model';
import { EspnPlayerInjuryStatus } from '@espnClient/espn-client.model';

@Component({
  selector: 'app-espn-player',
  templateUrl: './espn-player.component.html',
  styleUrls: ['./espn-player.component.scss'],
})
export class EspnPlayerComponent<T extends PlayerEntity> {
  @Input() player: T;
  @Input() hideLineupSlot: false;

  readonly MatIconByEspnPlayerInjuryStatus = MatIconByEspnPlayerInjuryStatus;
  readonly InjurySeverityByInjuryStatus = InjurySeverityByInjuryStatus;
  readonly InjurySeverityColorByInjurySeverity = InjurySeverityColorByInjurySeverity;
  readonly PlayerStatusAbbrevByInjuryStatusType = PlayerStatusAbbrevByInjuryStatusType;

  get playerLabel() {
    return `${this.player.name}, ${this.player.team}, ${this.player.position}`;
  }

  playerInjuryStatusColor(injuryStatus: EspnPlayerInjuryStatus): InjurySeverityColor {
    return InjurySeverityColorByInjurySeverity[InjurySeverityByInjuryStatus[injuryStatus]];
  }
}
