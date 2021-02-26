import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FantasyTeam } from '../../models';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  @Input() fantasyTeams: FantasyTeam[];

  dataSource = new MatTableDataSource<FantasyTeam>();

  readonly standingsColumns = [
    'id',
    'name'
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.fantasyTeams;
  }

}
