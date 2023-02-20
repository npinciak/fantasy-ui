import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ScatterChartDataset } from '@app/@shared/helpers/graph.helpers';
import { MLB_STATS_MAP } from 'sports-ui-sdk';

@Component({
  selector: `app-data-vis-scatter`,
  template: '<plotly-plot [useResizeHandler]="true" [config]="graph.config" [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
})
export class DataVisScatterComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() chartData: ScatterChartDataset[];
  @Input() xAxisFilterTitle: string;
  @Input() yAxisFilterTitle: string;

  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  constructor() {}

  graph: any;
  // data: any[];

  ngOnInit(): void {
    this.graph = {
      ...this.config,
      data: [this.data],
      layout: { ...this.graphLayout },
    };
  }

  get data() {
    return this.chartData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartData':
            if (!changes.chartData.isFirstChange()) {
              this.chartData = changes.chartData.currentValue;
              this.graph = {
                data: this.data,
                layout: { ...this.graphLayout },
              };
            }
            break;
          case 'title':
            this.title = changes.title.currentValue;
            break;
          case 'xAxisFilterTitle':
            this.xAxisFilterTitle = changes.xAxisFilterTitle.currentValue;
            break;
          case 'yAxisFilterTitle':
            this.yAxisFilterTitle = changes.yAxisFilterTitle.currentValue;
            break;
          default:
            break;
        }
      }
    }
  }

  get config() {
    return { responsive: true };
  }

  get graphLayout() {
    return {
      xaxis: {
        title: this.xAxisFilterTitle,
        tickfont: {
          // family: 'Old Standard TT, serif',
          size: 11,
          // showticklabels: true,
          tickangle: 'auto',
          // color: 'black',
        },
        // showgrid: true,
        // zeroline: true,
        // showline: true,
        // mirror: 'ticks',
        // gridcolor: '#bdbdbd',
        // gridwidth: 2,
        // zerolinecolor: '#969696',
        // zerolinewidth: 4,
        // linecolor: '#636363',
        // linewidth: 6,
      },
      yaxis: {
        title: this.yAxisFilterTitle,
        tickfont: {
          // family: 'Old Standard TT, serif',
          size: 11,
          // showticklabels: true,
          tickangle: 'auto',
          // color: 'black',
        },
        // showgrid: true,
        // zeroline: true,
        // showline: true,
        // mirror: 'ticks',
        // gridcolor: '#bdbdbd',
        // gridwidth: 2,
        // zerolinecolor: '#969696',
        // zerolinewidth: 4,
        // linecolor: '#636363',
        // linewidth: 6,
      },
    };
  }
}
