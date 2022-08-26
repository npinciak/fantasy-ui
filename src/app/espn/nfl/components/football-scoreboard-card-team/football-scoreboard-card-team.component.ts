import { Component, Input, OnInit } from '@angular/core';
import { FantasyMatchupTeam } from '../../models/fantasy-schedule.model';

@Component({
  selector: 'app-football-scoreboard-card-team',
  templateUrl: './football-scoreboard-card-team.component.html',
  styleUrls: ['./football-scoreboard-card-team.component.scss'],
})
export class FootballScoreboardCardTeamComponent implements OnInit {
  @Input() team: FantasyMatchupTeam;

  constructor() {}

  ngOnInit(): void {}
}
