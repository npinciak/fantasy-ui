import { Component, Input, OnInit } from '@angular/core';
import { PlayerNews } from '../../models/fantasy-player.class';
import { MLBFantasyPlayer } from '../../models/mlb/player.class';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() playerNews: PlayerNews;

  constructor() { }

  ngOnInit(): void {  }

}
