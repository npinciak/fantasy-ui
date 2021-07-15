import { Component, Input, OnInit } from '@angular/core';
import { BaseballPlayer } from '../../models/mlb/class/player.class';
import { MlbFacade } from '../../store/mlb/mlb.facade';

@Component({
  selector: 'app-free-agents',
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.css'],
})
export class FreeAgentsComponent implements OnInit {
  @Input() fantasyPlayers: Map<number, BaseballPlayer>;

  constructor(readonly mlbFacade: MlbFacade) {}

  ngOnInit(): void {}
}
