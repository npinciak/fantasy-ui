import { Component, Input, OnInit } from '@angular/core';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card',
  templateUrl: './lineup-card.component.html',
  styleUrls: ['./lineup-card.component.scss'],
})
export class LineupCardComponent implements OnInit {
  @Input() lineup: BaseballPlayer[];
  constructor() {}

  ngOnInit(): void {}
}
