import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() title = 'Scoreboard';
  @Input() teams: BaseballTeam[];
  @Input() isLoading = false;
  @Output() navigateToTeam = new EventEmitter<string>();
  @Output() refreshClicked = new EventEmitter();

  constructor() {}

  viewTeam(id: string): void {
    this.navigateToTeam.emit(id);
  }

  onRefreshClick() {
    this.refreshClicked.emit();
  }
}
