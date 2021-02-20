import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EspnService, Sports } from './espn.service';
import { League } from './models';
import { FantasyLeague } from './models/league.class';

@Component({
  selector: 'app-espn',
  templateUrl: './espn.component.html',
  styleUrls: ['./espn.component.css']
})
export class EspnComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private espnService: EspnService) { }

  ngOnInit(): void {
    const leagueId = this.activatedRoute.snapshot.params.leagueId;
    this.getLeague(leagueId).subscribe(res => console.log(new FantasyLeague(res.id, res.teams)));
  }


  getLeague = (leagueId: number) => this.espnService.getLeague(leagueId, Sports.nfl);

}
