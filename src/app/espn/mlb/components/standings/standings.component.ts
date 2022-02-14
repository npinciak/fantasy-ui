import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilterOptions } from '@app/@shared/models/filter.model';
import * as _ from 'lodash';
import { FantasyBaseballLeagueFacade } from '../../facade/fantasy-baseball-league.facade';
import { FantasyBaseballTeamFacade } from '../../facade/fantasy-baseball-team.facade';
import { standingsColumns } from '../../mlb.const';
import { RotoColumn, StatsColumn, TeamColumn } from '../../mlb.enums';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() teams: BaseballTeam[];
  @Input() dataColumns: any[];
  @Input() headers: any[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public scoringPeriod = this.fantasyBaseballLeagueFacade.scoringPeriod;

  readonly teamColumn = TeamColumn;
  readonly rotoColumn = RotoColumn;
  readonly statsColumn = StatsColumn;

  dataSource = new MatTableDataSource<BaseballTeam>();
  tableColumns: string[];
  viewOptions: unknown;

  constructor(
    readonly fantasyBaseballLeagueFacade: FantasyBaseballLeagueFacade,
    readonly fantasyBaseballTeamFacade: FantasyBaseballTeamFacade // private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tableColumns = standingsColumns.batting.rotoValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    // this.cdr.detectChanges();
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

  get statsView(): FilterOptions[] {
    return [
      { value: 'battingStatsRoto', label: 'B Roto' },
      { value: 'pitchingStatsRoto', label: 'P Roto' },
      { value: 'battingStats', label: 'B Stats' },
      { value: 'pitchingStats', label: 'P Stats' },
    ];
  }

  updateView(event: MatButtonToggleChange): void {
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
