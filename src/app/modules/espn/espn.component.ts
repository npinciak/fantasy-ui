import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspnFacade } from './store/espn.facade';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss']
})
export class EspnComponent implements OnInit {
  readonly sport = this.activatedRoute.snapshot.params.sport;
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    switch (this.sport) {
      case 'nfl':
        this.getNFLLeague(this.leagueId);
        break;
      case 'mlb':
        this.getMLBLeague(this.leagueId);
        // this.getFreeAgents(this.leagueId);
        break;
      default:
        break;
    }
  }

  private getNFLLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
  private getMLBLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
  private getFreeAgents = (leagueId: number) => this.espnFacade.getFreeAgents(leagueId);

}
