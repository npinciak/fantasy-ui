import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FantasyPlayer } from '../../models/fantasy-player.class';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  @Input() fantasyPlayers: FantasyPlayer[];

  dataSource = new MatTableDataSource<FantasyPlayer>();

  readonly rosterColumns = [
    'lineupSlot',
    'name',
    'ownership'
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.fantasyPlayers;
  }

}
