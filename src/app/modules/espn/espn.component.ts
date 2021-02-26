import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspnService, Sports } from './espn.service';
import { FantasyTeam } from './models';
import { FantasyLeague } from './models/league.class';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.scss']
})
export class EspnComponent implements OnInit {
  teams: FantasyTeam[];

  constructor(private activatedRoute: ActivatedRoute, private espnService: EspnService) { }

  ngOnInit(): void {

    const leagueId = this.activatedRoute.snapshot.params.leagueId;

    this.getNFLLeague(leagueId).subscribe(res => {
      const league = new FantasyLeague(res);
      this.teams = league.teams;
    });

  }

  getNFLLeague = (leagueId: number) => this.espnService.getLeague(leagueId, Sports.nfl);
  getMLBLeague = (leagueId: number) => this.espnService.getLeague(leagueId, Sports.mlb);
}
