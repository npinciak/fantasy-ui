import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sports } from './espn.service';
import { FantasyTeam } from './models';
import { FantasyPlayer } from './models/fantasy-player.class';
import { EspnFacade } from './store/espn.facade';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss']
})
export class EspnComponent implements OnInit {
  teams: FantasyTeam[];
  players: FantasyPlayer[];

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

  getNFLLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId, Sports.nfl);
  getMLBLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId, Sports.mlb);
}
