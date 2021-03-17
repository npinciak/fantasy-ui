import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FantasyPlayer } from '../../models/fantasy-player.class';
import { EspnFacade } from '../../store/espn.facade';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() fantasyPlayers: FantasyPlayer[];

  dataSource = new MatTableDataSource<FantasyPlayer>();

  readonly rosterColumns = [
    'id',
    'lineupSlot',
    'name',
    'team',
    'position'
  ];

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource.data = this.currentTeam.bench;
  }

  get bench() {
    return this.currentTeam.bench;
  }

  get pitchers() {
    return this.currentTeam.pitchers;
  }

  get batters() {
    return this.currentTeam.batters;
  }

  get starters() {
    return this.currentTeam.starter;
  }

  get teamName() {
    return this.currentTeam.name;
  }

  private get currentTeam() {
    return this.espnFacade.teamsSnapshot.find(team => team.id === this.teamId);
  }

  private get teamId(): number {
    return Number(this.activatedRoute.snapshot.params.teamId);
  }

}
