import { Component, Input } from '@angular/core';
import {
  InjurySeverityByInjuryStatus,
  InjurySeverityColor,
  InjurySeverityColorByInjurySeverity,
  MatIconByEspnPlayerInjuryStatus,
  PlayerStatusAbbrevByInjuryStatusType,
} from '@app/espn/models/injury.model';
import { Player } from '@app/espn/models/player.model';
import { EspnPlayerInjuryStatus } from '@client/espn-client.model';

@Component({
  selector: 'app-espn-player',
  templateUrl: './espn-player.component.html',
  styleUrls: ['./espn-player.component.scss'],
})
export class EspnPlayerComponent<T extends Player> {
  @Input() player: T;

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
