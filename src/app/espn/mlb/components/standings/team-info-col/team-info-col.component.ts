import { Component, Input } from '@angular/core';
import { BaseballTeam } from '@app/espn/mlb/models/baseball-team.model';

@Component({
  selector: 'app-team-info-col',
  templateUrl: './team-info-col.component.html',
})
export class TeamInfoColComponent {
  @Input() team: BaseballTeam;
  @Input() isLeader: boolean;
  constructor() {}
}
