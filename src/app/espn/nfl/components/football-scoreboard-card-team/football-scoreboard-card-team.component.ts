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

  get opacity() {
    if (this.isGameUndecided) return null;

    return !this.team.isWinner ? '50%' : null;
  }

  get isGameUndecided() {
    return this.team.isWinner == null;
  }
}
