import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyTeam } from '../../models';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, OnChanges {
  @Input() fantasyTeams: any;

  dataSource = new MatTableDataSource<FantasyTeam>();

  readonly standingsColumns = [
    'id',
    'name'
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {  }

  viewTeam = (id: number) => this.router.navigate([`espn/${this.leagueId}/team`, id]);

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'fantasyTeams':
            this.fantasyTeams = changes[propName].currentValue;
            this.dataSource.data = this.fantasyTeams;
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
}
