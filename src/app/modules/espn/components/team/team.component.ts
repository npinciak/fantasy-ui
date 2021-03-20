import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MLBFantasyPlayer } from '../../models/mlb/player.class';
import { EspnFacade } from '../../store/espn.facade';
import { Sports } from '../../store/espn.state';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() fantasyPlayers: MLBFantasyPlayer[];

  dataSource = new MatTableDataSource<MLBFantasyPlayer>();

  readonly rosterColumns = [
    'id',
    'lineupSlot',
    'name',
    'team',
    'position'
  ];

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.currentTeam) {
      this.espnFacade.getLeague(this.leagueId, Sports.mlb);
    }
  }

  get batters() {
    return this.currentTeam.batters;
  }

  get teamName() {
    return this.currentTeam.name;
  }

  get currentTeam() {
    return this.espnFacade.teamsSnapshot.find(team => team.id === this.teamId);
  }

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get sport() {
    return this.activatedRoute.snapshot.params.sport;
  }

  private get teamId(): number {
    return Number(this.activatedRoute.snapshot.params.teamId);
  }

}
