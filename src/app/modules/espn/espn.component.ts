/* eslint-disable no-debugger */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { FetchBaseballLeague } from './store/mlb/mlb.actions';
import { MlbFacade } from './store/mlb/mlb.facade';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss']
})
export class EspnComponent implements OnInit {
  readonly sport = this.activatedRoute.snapshot.params.sport;
  readonly leagueId = this.activatedRoute.snapshot.params.leagueId;

  constructor(
    readonly mlbFacade: MlbFacade,
    private activatedRoute: ActivatedRoute,
    private store: Store) { }

  ngOnInit(): void {
        this.getMLBLeague(this.leagueId);
    }
  }
  private getMLBLeague = (leagueId: number) => this.store.dispatch(new FetchBaseballLeague(leagueId));

  private getNFLLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
  private getMLBLeague = (leagueId: number) => this.espnFacade.getLeague(leagueId);
  private getFreeAgents = (leagueId: number) => this.espnFacade.getFreeAgents(leagueId);

}
