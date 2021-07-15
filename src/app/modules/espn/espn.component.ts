import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MlbFacade } from './store/mlb/mlb.facade';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss'],
})
export class EspnComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly NO_GAMES_TEXT = `No games scheduled for today`;

  constructor(
    readonly mlbFacade: MlbFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMLBLeague(this.leagueId);
  }

  private getMLBLeague = (leagueId: number) =>
    this.mlbFacade.getLeague(leagueId);
}
