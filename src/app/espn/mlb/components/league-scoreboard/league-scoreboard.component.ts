import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '@app/espn/models/team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() teams: Team[];

  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly sport = this.activatedRoute.snapshot.params.sport;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  viewTeam(id: number): void {
    this.router.navigate([`espn/${this.sport}/${this.leagueId}/team`, id]);
  }
}
