import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '@app/espn/models/team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() teams: Team[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  viewTeam = (id: number) => this.router.navigate([`espn/${this.sport}/${this.leagueId}/team`, id]);

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get sport() {
    return this.activatedRoute.snapshot.params.sport;
  }
}
