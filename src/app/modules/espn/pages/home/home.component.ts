import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ESPN_TEXT } from '../../espn.const';
import { MlbFacade } from '../../store/mlb/mlb.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor(readonly mlbFacade: MlbFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.mlbFacade.getLeague(this.leagueId);
  }
}
