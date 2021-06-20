import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { MlbFacade } from '../../store/mlb/mlb.facade';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { RotoColumn, StatsColumn, TeamColumn } from '../../models/mlb/mlb.enums';
import { standingsColumns } from '../../models/mlb/mlb.const';
import { TEST_ID } from '@app/@shared/helpers/testConfigs';
import { mlbTeamMap } from '../../models/mlb/maps';
import { mlbStadiumMap } from '../../models/mlb/maps/mlb-team.map';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnChanges {
  @Input() teams: BaseballTeam[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly teamColumn = TeamColumn;
  readonly rotoColumn = RotoColumn;
  readonly statsColumn = StatsColumn;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly TEST_ID = TEST_ID.STAT_TOGGLE;

  dataSource = new MatTableDataSource<BaseballTeam>();
  tableColumns: string[];
  viewOptions: any;

  constructor(readonly mlbFacade: MlbFacade) { }

  ngOnInit(): void {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    this.tableColumns = standingsColumns.batting.rotoValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teams':
            this.teams = changes[propName].currentValue;
            this.dataSource.data = this.teams;
            this.dataSource.sort = this.sort;
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
      { value: 'pitchingStats', label: 'P Stats' }
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

  get scoringPeriod() {
    return this.mlbFacade.scoringPeriod;
  }

}
