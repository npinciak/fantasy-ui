import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { ChartDatasetProperties } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ESPN_TEXT } from '../../../espn.const';
import { MlbGameFacade } from '../../facade/mlb-game.facade';
import { MlbFacade } from '../../facade/mlb.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor(
    readonly mlbFacade: MlbFacade,

    readonly mlbGameFacade: MlbGameFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mlbFacade.getLeague(this.leagueId);
  }
}
