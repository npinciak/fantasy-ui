import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  FA_ICON_BY_INJURY_STATUS,
  INJURY_LABEL_BY_INJURY_STATUS,
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_CLASS,
  PLAYER_INJURY_STATUS,
} from '@sports-ui/ui-sdk/espn';

@Component({ template: '' })
export class EspnPlayerComponent<T extends PlayerEntity> {
  @Input() player: T;
  @Input() isLoading = false;
  @Input() hideLineupSlot = false;

  @Output() playerClicked = new EventEmitter<T>();

  readonly FaIconByEspnPlayerInjuryStatus = FA_ICON_BY_INJURY_STATUS;
  readonly InjurySeverityByInjuryStatus = INJURY_SEVERITY_BY_INJURY_STATUS;
  readonly InjurySeverityClassByInjurySeverity = INJURY_SEVERITY_CLASS;
  readonly InjuryLabelByInjuryStatus = INJURY_LABEL_BY_INJURY_STATUS;
  readonly PlayerInjuryStatus = PLAYER_INJURY_STATUS;

  onPlayerClick() {
    this.playerClicked.emit(this.player);
  }

  get ariaLabel(): string {
    return `${this.player.name}, ${this.player.position} for the ${this.player.team}`;
  }
}
