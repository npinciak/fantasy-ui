import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseballTeam } from '@mlb/class/team.class';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
})
export class LeagueScoreboardComponent {
  @Input() teams: BaseballTeam[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  viewTeam = (id: number) => this.router.navigate([`espn/${this.sport}/${this.leagueId}/team`, id]);

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get sport() {
    return this.activatedRoute.snapshot.params.sport;
  }
}
