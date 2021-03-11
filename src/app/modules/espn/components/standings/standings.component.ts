import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyTeam } from '../../models';
import { MLBFantasyTeam } from '../../models/fantasy-team.class';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, OnChanges {
  @Input() fantasyTeams: MLBFantasyTeam[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource = new MatTableDataSource<FantasyTeam>();

  readonly standingsColumns = [
    'rankDiff',
    'name',
    // 'hitsAB',
    'R',
    'HR',
    'RBI',
    'SB',
    'AVG',
    'totalPoints'
  ];


  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { }

  viewTeam = (id: number) => this.router.navigate([`espn/${this.sport}/${this.leagueId}/team`, id]);


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'fantasyTeams':
            this.fantasyTeams = changes[propName].currentValue;
            this.dataSource.data = this.fantasyTeams;
            this.dataSource.sort = this.sort;
            break;
          default:
            break;
        }
      }
    }
  }

  private get leagueId() {
    return this.activatedRoute.snapshot.params.leagueId;
  }

  private get sport() {
    return this.activatedRoute.snapshot.params.sport;
  }
}
