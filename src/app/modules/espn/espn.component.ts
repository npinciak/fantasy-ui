import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EspnFacade } from './store/espn.facade';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss']
})
export class EspnComponent implements OnInit {

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const sport = this.activatedRoute.snapshot.params.sport;
    const leagueId = this.activatedRoute.snapshot.params.leagueId;

    switch (sport) {
      case 'nfl':
        this.getNFLLeague(leagueId);
        break;
      case 'mlb':
        this.getMLBLeague(leagueId);
        break;
      default:
        break;
    }

  }

  getNFLLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
  getMLBLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
}
