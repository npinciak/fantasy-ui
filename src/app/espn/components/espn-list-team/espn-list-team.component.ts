import { Component, Input, OnInit } from '@angular/core';
import { FastcastEventTeam } from '@app/espn/models/fastcast-team.model';

enum HomeAwayTeam {
  Home,
  Away,
}

@Component({
  selector: 'app-espn-list-team',
  templateUrl: './espn-list-team.component.html',
  styleUrls: ['./espn-list-team.component.scss'],
})
export class EspnListTeamComponent implements OnInit {
  @Input() team: FastcastEventTeam;
  @Input() homeAway: HomeAwayTeam;

  readonly HomeAwayTeam = HomeAwayTeam;

  constructor() {}

  ngOnInit(): void {}
}
