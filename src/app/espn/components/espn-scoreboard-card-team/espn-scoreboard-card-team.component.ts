import { Component, Input } from '@angular/core';
import { FastcastEventTeam } from '@app/espn/models/fastcast-team.model';

@Component({
  selector: 'app-espn-scoreboard-card-team',
  templateUrl: './espn-scoreboard-card-team.component.html',
  styleUrls: ['./espn-scoreboard-card-team.component.scss'],
})
export class EspnScoreboardCardTeamComponent {
  @Input() team: FastcastEventTeam;
  @Input() isTournament: boolean;
}
