import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';
import { BaseGraph } from '../../models/graph.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { EspnFacade } from '../../store/espn.facade';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { RotoColumn, StatsColumn, TeamColumn } from '../../models/mlb/mlb.enums';
import { standingsColumns, battingStatsColumns, pitchingStatsColumns } from '../../models/mlb/mlb.const';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit, OnChanges {
  @Input() teams: BaseballTeam[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  readonly teamColumn = TeamColumn;
  readonly rotoColumn = RotoColumn;
  readonly statsColumn = StatsColumn;

  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'top'
    },
    tooltips: {
      mode: 'index',
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          type: 'linear',
          position: 'bottom',
          ticks: {
            beginAtZero: true,
            fontFamily: 'Muli, Arial, sans-serif',
            fontColor: '#707070',
            padding: 8,
            fontSize: 14,
            //     callback: GraphingOptions.ValuePrettify
          },
          gridLines: {
            color: '#f5f5f5'
          }
        }
      ]
    }
  };
  public chartData: ChartDataSets[];

  dataSource = new MatTableDataSource<BaseballTeam>();
  tableColumns: string[];
  viewOptions: any;

  constructor(readonly espnFacade: EspnFacade, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.data = this.teams;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    this.tableColumns = standingsColumns;
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'teams':
            this.teams = changes[propName].currentValue;
            this.dataSource.data = this.teams;
            this.dataSource.sort = this.sort;

            // this.chartData = [
            //   { data: this.teams.map(team => team.stats.hr), label: 'hr', fill: false },
            //   { data: this.teams.map(team => team.stats.rbi), label: 'rbi', fill: false },
            //   { data: this.teams.map(team => team.stats.r), label: 'r', fill: false },
            //   { data: this.teams.map(team => team.stats.sb), label: 'sb', fill: false },
            //   { data: this.teams.map(team => team.stats.h), label: 'h', fill: false },
            // ];

            break;
          default:
            break;
        }
      }
    }
  }

  get scoreBoard() {
    return this.teams.sort((a, b) => b.liveScore - a.liveScore);
  }

  get leagueChart() {
    return new BaseGraph(this.chartData, this.teams.map(team => team.teamName), 'line', true);
  }

  get statsView() {
    return [
      { value: 'battingStats', label: 'Batter' },
      { value: 'pitchingStats', label: 'Pitcher' },
      { value: 'roto', label: 'Roto' }
    ];
  }

  updateView(event: MatButtonToggleChange) {
    switch (event.value) {
      case 'battingStats':
        this.tableColumns = battingStatsColumns;
        break;
      case 'pitchingStats':
        this.tableColumns = pitchingStatsColumns;
        break;
      case 'roto':
        this.tableColumns = standingsColumns;
        break;
      default:
        this.tableColumns = standingsColumns;
        break;
    }
  }

}
