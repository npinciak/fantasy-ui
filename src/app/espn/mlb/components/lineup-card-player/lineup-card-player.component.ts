import { Component, Input, OnInit } from '@angular/core';
import { BaseballPlayer } from '../../class/baseballPlayer.class';

@Component({
  selector: 'app-lineup-card-player',
  templateUrl: './lineup-card-player.component.html',
  styleUrls: ['./lineup-card-player.component.scss'],
})
export class LineupCardPlayerComponent implements OnInit {
  @Input() player: BaseballPlayer;

  constructor() {}

  ngOnInit(): void {}
}
