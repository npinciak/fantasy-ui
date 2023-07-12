import { Component, Input } from '@angular/core';
import { FootballTeam } from '../../models/football-team.model';

@Component({
  selector: 'app-football-team-header',
  templateUrl: './football-team-header.component.html',
})
export class FootballTeamHeaderComponent {
  @Input() team: FootballTeam;
  @Input() backgroundColor = '';

  constructor() {}
}
