import { Component, Input, OnInit } from '@angular/core';
import { FastcastEventTeam } from '@app/espn/models/fastcast-team.model';

@Component({
  selector: 'app-espn-scoreboard-card-team',
  templateUrl: './espn-scoreboard-card-team.component.html',
  styleUrls: ['./espn-scoreboard-card-team.component.scss'],
})
export class EspnScoreboardCardTeamComponent implements OnInit {
  @Input() team: FastcastEventTeam;
  @Input() redzone: boolean;

  constructor() {}

  ngOnInit(): void {}

  get isRedzone() {
    return this.team.hasPossession && this.redzone;
  }
}
