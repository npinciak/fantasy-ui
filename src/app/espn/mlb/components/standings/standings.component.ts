import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnDataType } from '@app/espn/models/table.model';
import * as _ from 'lodash';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { RotoColumn, StatsColumn, TeamColumn } from '../../mlb.enums';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() teams: BaseballTeam[];
  @Input() dataColumns: any[];
  @Input() headers: any[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public scoringPeriod = this.fantasyBaseballLeagueFacade.scoringPeriod;

  readonly TableColumnDataType = TableColumnDataType;

  readonly teamColumn = TeamColumn;
  readonly rotoColumn = RotoColumn;
  readonly statsColumn = StatsColumn;

  dataSource = new MatTableDataSource<BaseballTeam>();
  viewOptions: unknown;

  constructor(
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teams':
            this.teams = changes[propName].currentValue;

            this.dataSource.data = this.teams;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = _.get;

            break;
          default:
            break;
        }
      }
    }
  }
}
