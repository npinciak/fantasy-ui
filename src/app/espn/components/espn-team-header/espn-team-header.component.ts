import { Component, Input } from '@angular/core';
import { BaseballTeam } from '@app/espn-fantasy-baseball/models/baseball-team.model';

@Component({
  selector: 'app-espn-team-header',
  templateUrl: './espn-team-header.component.html',
})
export class EspnTeamHeaderComponent {
  @Input() team: BaseballTeam;
  @Input() backgroundColor = '';
  @Input() leagueSize = 10;

  constructor() {}
}
