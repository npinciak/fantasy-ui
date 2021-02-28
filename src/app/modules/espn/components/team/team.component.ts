import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FantasyPlayer } from '../../models/fantasy-player.class';

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
    'name',
    'position'
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.fantasyPlayers;
  }

}
