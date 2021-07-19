import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseballTeam } from '../../class/team.class';
import { MlbFacade } from '../../facade/mlb.facade';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { RotoColumn, StatsColumn, TeamColumn } from '../../mlb.enums';
import { standingsColumns } from '../../mlb.const';
import { TEST_ID } from '@app/@shared/helpers/testConfigs';
import { mlbTeamMap } from '../../maps/mlb-team.map';
import { MLB_STADIUM_MAP } from '../../maps/mlb-team.map';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() teams: BaseballTeam[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public scoringPeriod = this.mlbFacade.scoringPeriod;

  readonly teamColumn = TeamColumn;
  readonly rotoColumn = RotoColumn;
  readonly statsColumn = StatsColumn;

  dataSource = new MatTableDataSource<BaseballTeam>();
  tableColumns: string[];
  viewOptions: any;

  constructor(readonly mlbFacade: MlbFacade) {}

  ngOnInit(): void {
    this.tableColumns = standingsColumns.batting.rotoValue;
  }

  ngAfterViewInit() {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
  }

  ngOnChanges(changes: SimpleChanges) {
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

  get statsView() {
    return [
      { value: 'battingStatsRoto', label: 'B Roto' },
      { value: 'pitchingStatsRoto', label: 'P Roto' },
      { value: 'battingStats', label: 'B Stats' },
      { value: 'pitchingStats', label: 'P Stats' },
    ];
  }

  updateView(event: MatButtonToggleChange) {
    switch (event.value) {
      case 'battingStats':
        this.tableColumns = standingsColumns.batting.statValue;
        break;
      case 'pitchingStats':
        this.tableColumns = standingsColumns.pitching.statValue;
        break;
      case 'battingStatsRoto':
        this.tableColumns = standingsColumns.batting.rotoValue;
        break;
      case 'pitchingStatsRoto':
        this.tableColumns = standingsColumns.pitching.rotoValue;
        break;
      default:
        this.tableColumns = standingsColumns.batting.rotoValue;
        break;
    }
  }
}
