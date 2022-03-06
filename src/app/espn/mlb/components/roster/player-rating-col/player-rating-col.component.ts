import { Component, Input, OnInit } from '@angular/core';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';

@Component({
  selector: 'app-player-rating-col',
  templateUrl: './player-rating-col.component.html',
})
export class PlayerRatingColComponent implements OnInit {
  @Input() player: BaseballPlayer;
  @Input() key: string;

  constructor() {}

  ngOnInit(): void {}
}
