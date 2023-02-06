import { Component, Input } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  EspnClient,
  InjurySeverityColor,
  INJURY_LABEL_BY_INJURY_STATUS,
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY,
  MAT_ICON_BY_INJURY_STATUS,
} from 'sports-ui-sdk';

@Component({
  selector: 'app-espn-player',
  templateUrl: './espn-player.component.html',
  styleUrls: ['./espn-player.component.scss'],
})
export class EspnPlayerComponent<T extends PlayerEntity> {
  @Input() player: T;
  @Input() hideLineupSlot: false;

  readonly MatIconByEspnPlayerInjuryStatus = MAT_ICON_BY_INJURY_STATUS;
  readonly InjurySeverityByInjuryStatus = INJURY_SEVERITY_BY_INJURY_STATUS;
  readonly InjurySeverityColorByInjurySeverity = INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY;
  readonly PlayerStatusAbbrevByInjuryStatusType = INJURY_LABEL_BY_INJURY_STATUS;

  get playerLabel(): string {
    return `${this.player.name}, ${this.player.team}, ${this.player.position}`;
  }

  playerInjuryStatusColor(injuryStatus: EspnClient.PlayerInjuryStatus): InjurySeverityColor {
    return INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY[INJURY_SEVERITY_BY_INJURY_STATUS[injuryStatus]];
  }
}
