import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ESPN_TEXT } from '@app/espn/espn.const';
import { NflEventFacade } from '../../facade/nfl-event.facade';
import { NFLFacade } from '../../facade/nfl.facade';
import { NflEvent } from '../../models/nfl-event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;
  readonly NO_GAMES_TEXT = ESPN_TEXT.NO_GAMES_TEXT;

  event: NflEvent;

  constructor(readonly nflEventFacade: NflEventFacade, readonly nflFacade: NFLFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.nflFacade.getLeague(this.leagueId).toPromise();
  }
}
