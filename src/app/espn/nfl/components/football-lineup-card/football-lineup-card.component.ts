import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FootballPlayer } from '../../models/football-player.model';

@Component({
  selector: 'app-football-lineup-card',
  templateUrl: './football-lineup-card.component.html',
  styleUrls: ['./football-lineup-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FootballLineupCardComponent implements OnChanges {
  @Input() title: string = 'Lineup';
  @Input() lineup: FootballPlayer[];
  @Input() points = 0;
  @Input() projectedPoints: number;
  @Input() scoringPeriodId: number;

  @Input() isLoading = false;

  @Output() playerClicked = new EventEmitter<FootballPlayer | null>();
  @Output() refreshClicked = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  onPlayerClick(player): void {
    this.playerClicked.emit(player);
  }

  onRefreshClick(): void {
    this.refreshClicked.emit();
  }
}
