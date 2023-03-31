import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() title = 'Scoreboard';
  @Input() teams: BaseballTeam[];
  @Input() isLoading = false;

  @Output() refreshClicked = new EventEmitter();

  constructor(private routerFacade: RouterFacade) {}

  viewTeam(id: string): void {
    this.routerFacade.navigateToFantasyTeam(id);
  }

  onRefreshClick() {
    this.refreshClicked.emit();
  }
}
