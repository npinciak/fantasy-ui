import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ESPN_TEXT } from '../../../espn.const';
import { MlbEventFacade } from '../../facade/mlb-event.facade';
import { MlbFacade } from '../../facade/mlb.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor(readonly mlbFacade: MlbFacade, readonly mlbEventFacade: MlbEventFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.mlbFacade.getLeague(this.leagueId);
  }
}
