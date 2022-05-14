import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlBuilder } from '@app/@shared/url-builder';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-league-scoreboard',
  templateUrl: './league-scoreboard.component.html',
  styleUrls: ['./league-scoreboard.component.scss'],
})
export class LeagueScoreboardComponent {
  @Input() teams: BaseballTeam[];

  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  viewTeam(id: string): void {
    this.router.navigate([UrlBuilder.espnMlbLeagueTeam(this.leagueId, id)]);
  }

  getTooltipText(team: BaseballTeam): string | null {
    if (team.liveScore - team.totalPoints > 0) {
      return `Up from ${team.totalPoints}`;
    } else if (team.liveScore - team.totalPoints < 0) {
      return `Down from ${team.totalPoints}`;
    } else {
      return null;
    }
  }

  getColor(team: BaseballTeam): string | null {
    if (team.liveScore - team.totalPoints > 0) {
      return 'green';
    } else if (team.liveScore - team.totalPoints < 0) {
      return 'red';
    } else {
      return null;
    }
  }
}
