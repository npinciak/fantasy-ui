import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';

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

  onPlayerClick(player: T): void {
    this.playerClicked.emit(player);
  }

  onRefreshClick(): void {
    this.refreshClicked.emit();
  }
}
