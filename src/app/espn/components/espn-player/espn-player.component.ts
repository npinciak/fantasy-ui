import { Component, Input } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  FA_ICON_BY_INJURY_STATUS,
  INJURY_LABEL_BY_INJURY_STATUS,
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY,
  InjurySeverityColor,
  PlayerInjuryStatus,
} from 'sports-ui-sdk';

@Component({
  selector: 'app-espn-player',
  templateUrl: './espn-player.component.html',
})
export class EspnPlayerComponent<T extends PlayerEntity> {
  @Input() player: T;
  @Input() isLoading = false;
  @Input() hideLineupSlot = false;

  readonly MatIconByEspnPlayerInjuryStatus = FA_ICON_BY_INJURY_STATUS;
  readonly InjurySeverityByInjuryStatus = INJURY_SEVERITY_BY_INJURY_STATUS;
  readonly InjurySeverityColorByInjurySeverity = INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY;
  readonly PlayerStatusAbbrevByInjuryStatusType = INJURY_LABEL_BY_INJURY_STATUS;

  get playerLabel(): string {
    return `${this.player.name}, ${this.player.team}, ${this.player.position}`;
  }

  playerInjuryStatusColor(injuryStatus: PlayerInjuryStatus): InjurySeverityColor {
    return INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY[INJURY_SEVERITY_BY_INJURY_STATUS[injuryStatus]];
  }
}
