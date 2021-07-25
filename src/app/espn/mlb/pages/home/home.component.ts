import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '@app/@shared/class';
import { EspnService } from '@app/espn/espn.service';
import { ESPN_TEXT } from '../../../espn.const';
import { BaseballGame } from '../../class';
import { MlbGameFacade } from '../../facade/mlb-game.facade';
import { MlbFacade } from '../../facade/mlb.facade';
import { MockGame } from '../../mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor(readonly mlbFacade: MlbFacade, readonly mlbGameFacade: MlbGameFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.mlbFacade.getLeague(this.leagueId);
  }
}
