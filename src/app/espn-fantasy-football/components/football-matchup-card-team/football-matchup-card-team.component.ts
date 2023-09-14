import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FantasyMatchupTeam } from '../../models/fantasy-schedule.model';

@Component({
  selector: 'app-football-matchup-card-team',
  templateUrl: './football-matchup-card-team.component.html',
})
export class FootballMatchupCardTeamComponent implements OnInit {
  @Input() team: FantasyMatchupTeam;

  @Output() teamClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}


  get isGameUndecided() {
    return this.team.isWinner == null;
  }

  onTeamClicked() {
    this.teamClicked.emit(this.team.id);
  }
}
