import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ESPN_TEXT } from '@app/espn/espn.const';
import { NFLFacade } from '../../facade/nfl.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  constructor(readonly nflFacade: NFLFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.nflFacade.getLeague(this.leagueId).toPromise();
  }
}
