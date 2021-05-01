import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { EspnService, Sports } from '../../espn.service';
import { BaseGraph } from '../../models/graph.class';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BaseballPlayer } from '../../models/mlb/class/player.class';
import { battingStatsColumns, rosterColumns } from '../../models/mlb/mlb.const';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit, AfterViewInit {
  @Input() fantasyPlayers: BaseballPlayer[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  readonly rosterColumns = rosterColumns;

  dataSource = new MatTableDataSource<any>();
  playerNews: any;
  chartData: ChartDataSets[];
  viewOptions: any;
  tableColumns: string[];
  // chartOptions: ChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   title: {
  //     display: true,
  //     text: '2020'
  //   },
  //   // plugins: {
  //   //   datalabels: {
  //   //     anchor: 'end',
  //   //     align: 'end',
  //   //   }
  //   // },
  //   tooltips: {
  //     callbacks: {
  //       label: function (tooltipItem, data) {
  //         var label = data.datasets[tooltipItem.datasetIndex].label || '';

  //         if (label) {
  //           label += ': ';
  //         }
  //         // label += Math.round(tooltipItem.yLabel * 100) / 100;
  //         return label;
  //       }
  //     }
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         display: true,
  //         gridLines: {
  //           color: '#f5f5f5'
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Hour',
  //           fontFamily: 'Muli, Arial, sans-serif',
  //           fontColor: '#707070',
  //           padding: 20,
  //           fontSize: 14
  //         },
  //         position: 'bottom'
  //       }],
  //       yAxes: []
  //   },
  //   legend: {
  //     display: true,
  //     position: 'top'
  //   }
  // };


  readonly l15StatsColumns = [
    'lineupSlot',
    'name',
    'statsL15.h',
    'statsL15.avg',
    'statsL15.obp',
    'statsL15.ops',
    'statsL15.slg',
    'wOBA15',
    'statsL15.rc',
    'ratingsL15.totalRating'
  ];

  readonly l30StatsColumns = [
    'lineupSlot',
    'name',
    // 'statsL30.h',
    // 'statsL30.h',
    // 'statsL30.avg',
    // 'statsL30.obp',
    // 'statsL30.ops',
    // 'statsL30.slg',
    // 'wOBA30'
  ];

  constructor(private espnService: EspnService) { }

  ngOnInit() {

    this.tableColumns = rosterColumns.batters.l7;

    console.log(this.fantasyPlayers[0]);
    this.dataSource.data = this.fantasyPlayers;
    this.dataSource.sortingDataAccessor = _.get;
  }


  ngAfterViewInit() { this.dataSource.sort = this.sort; };

  updateView(event: MatButtonToggleChange) {

    this.tableColumns = rosterColumns.batters[event.value];
    // switch (event.value) {
    //   case 'l7':
    //     this.tableColumns = rosterColumns[event.value].batters;
    //     break;
    //   case 'l15':
    //     this.tableColumns = this.l15StatsColumns;
    //     break;
    //   case 'l30':
    //     this.tableColumns = this.l30StatsColumns;
    //     break;
    //   default:
    //     // this.tableColumns = this.rosterColumns;
    //     break;
    // }
  }

}
