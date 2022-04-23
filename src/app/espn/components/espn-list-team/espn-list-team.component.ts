import { Component, Input } from '@angular/core';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';

enum HomeAwayTeam {
  Home,
  Away,
}

@Component({
  selector: 'app-espn-list-team',
  templateUrl: './espn-list-team.component.html',
  styleUrls: ['./espn-list-team.component.scss'],
})
export class EspnListTeamComponent {
  @Input() team: FastcastEventTeam;
  @Input() homeAway: HomeAwayTeam;

  readonly HomeAwayTeam = HomeAwayTeam;

  get homeAwayLayout() {
    return this.homeAway === HomeAwayTeam.Away ? 'row' : 'row-reverse';
  }

  get homeAwayLayoutAlign() {
    return this.homeAway === HomeAwayTeam.Away ? 'end' : 'start';
  }
}
