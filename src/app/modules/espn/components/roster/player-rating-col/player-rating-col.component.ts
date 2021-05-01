import { Component, Input, OnInit } from '@angular/core';
import { BaseballPlayer } from '../../../models/mlb/class/player.class';

@Component({
  selector: 'app-player-rating-col',
  templateUrl: './player-rating-col.component.html',
  styleUrls: ['./player-rating-col.component.scss']
})
export class PlayerRatingColComponent implements OnInit {
  @Input() player: BaseballPlayer;
  @Input() key: string;


  constructor() { }

  ngOnInit(): void {  }

}
