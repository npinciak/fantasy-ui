import { Component, Input, OnInit } from '@angular/core';
import { BaseballTeam } from '@app/espn/mlb/models/baseball-team.model';

@Component({
  selector: 'app-ranking-col',
  templateUrl: './ranking-col.component.html',
})
export class RankingColComponent implements OnInit {
  @Input() team: BaseballTeam;
  constructor() {}

  ngOnInit(): void {}
}
