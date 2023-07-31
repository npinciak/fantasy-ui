import { Component, Input } from '@angular/core';
import { BaseballTeam } from '@app/espn/mlb/models/baseball-team.model';

@Component({
  selector: 'app-espn-team-header',
  templateUrl: './espn-team-header.component.html',
})
export class EspnTeamHeaderComponent {
  @Input() team: BaseballTeam;
  @Input() backgroundColor = '';

  constructor() {}
}
