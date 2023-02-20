import { Component, Input } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() teams: BaseballTeam[];

  constructor(private routerFacade: RouterFacade) {}

  viewTeam(id: string): void {
    this.routerFacade.navigateToFantasyTeam(id);
  }
}
