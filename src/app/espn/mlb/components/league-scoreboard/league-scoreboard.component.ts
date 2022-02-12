import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlBuilder } from '@app/@shared/url-builder';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() teams: BaseballTeam[];

  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  viewTeam(id: string): void {
    this.router.navigate([UrlBuilder.espnMlbLeagueTeam(this.leagueId, id)]);
  }
}
