import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import {
  FA_ICON_BY_INJURY_STATUS,
  INJURY_LABEL_BY_INJURY_STATUS,
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_CLASS,
} from 'sports-ui-sdk';

@Component({ template: '' })
export class EspnLineupCardComponent<T extends PlayerEntity> {
  @Input() title = 'Lineup';
  @Input() lineup: T[];
  @Input() points = 0;
  @Input() projectedPoints: number;
  @Input() scoringPeriodId: number;

  @Input() isLoading = false;

  @Output() playerClicked = new EventEmitter<T | null>();
  @Output() refreshClicked = new EventEmitter();

  readonly FaIconByEspnPlayerInjuryStatus = FA_ICON_BY_INJURY_STATUS;
  readonly InjurySeverityByInjuryStatus = INJURY_SEVERITY_BY_INJURY_STATUS;
  readonly InjurySeverityClassByInjurySeverity = INJURY_SEVERITY_CLASS;
  readonly InjuryLabelByInjuryStatus = INJURY_LABEL_BY_INJURY_STATUS;

  onPlayerClick(player: T): void {
    this.playerClicked.emit(player);
  }

  onRefreshClick(): void {
    this.refreshClicked.emit();
  }
}
