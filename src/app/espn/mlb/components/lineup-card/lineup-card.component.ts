import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseballPlayer } from '../../models/baseball-player.model';

@Component({
  selector: 'app-lineup-card',
  templateUrl: './lineup-card.component.html',
  styleUrls: ['./lineup-card.component.scss'],
})
export class LineupCardComponent implements OnInit {
  @Input() title: string = 'Lineup';
  @Input() lineup: BaseballPlayer[];
  @Output() fetchPlayerDetails = new EventEmitter<BaseballPlayer>();

  constructor() {}

  ngOnInit(): void {}

  showPlayerDetails(player: BaseballPlayer) {
    this.fetchPlayerDetails.emit(player);
  }
}
