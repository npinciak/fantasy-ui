import { Component, Input } from '@angular/core';
import { BaseballTeam } from '@app/espn/mlb/models/baseball-team.model';

@Component({
  selector: 'app-fantasy-team-header',
  templateUrl: './fantasy-team-header.component.html',
})
export class FantasyTeamHeaderComponent {
  @Input() team: BaseballTeam;
  @Input() backgroundColor = '';

  constructor() {}
}
