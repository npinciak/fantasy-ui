import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  StatByThreshold,
  StatThresholdByStatThresholdLabel,
  StatThresholdColors,
  StatThresholdLabelByStatThreshold,
} from '@app/@shared/models/stat-threshold.model';
import { MlbThresholds } from '@app/espn/mlb/consts/stats-threshold.m';
import { ChartData } from '@app/espn/mlb/models/chart-data.model';
import { BaseballStat, MLB_STATS_MAP } from 'sports-ui-sdk';

@Component({
  selector: `app-data-vis`,
  template: '<plotly-plot [useResizeHandler]="true" [config]="{ responsive: true }" [data]="test" [layout]="graph?.layout"></plotly-plot>',
})
export class DataVisComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() chartData: ChartData[];
  @Input() statFilter: BaseballStat = BaseballStat.AB;

  public graph: ChartNew<number>;
  public test: any[]; //{ x: string[]; y: number[]; type: string; name?: string; showlegend?: boolean }[];
  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  constructor() {
    this.graph = new ChartNew<number>({ config: this.config, layout: this.layout, type: 'bar' });
  }

  ngOnInit(): void {
    this.updateChart(this.chartData, this.statFilter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      // eslint-disable-next-line no-prototype-builtins
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartData':
            if (!changes.chartData.isFirstChange()) {
              this.chartData = changes.chartData.currentValue;
              this.updateChart(this.chartData, this.statFilter);
            }
            break;
          case 'statFilter':
            this.statFilter = changes.statFilter.currentValue;
            this.updateChart(this.chartData, this.statFilter);
            break;
          case 'title':
            this.title = changes.title.currentValue;
            break;
          default:
            break;
        }
      }
    }
  }

  private statThresholdPoints(data: ChartData[], thresholdByStat: StatByThreshold): StatThresholdByStatThresholdLabel {
    const length = data.length;

    const map = {} as StatThresholdByStatThresholdLabel;
    for (const [x, y] of Object.entries(thresholdByStat)) {
      map[StatThresholdLabelByStatThreshold[x]] = Array.from<number>({ length }).fill(thresholdByStat[x]);
    }

    return map;
  }

  private updateChart(data: ChartData[], statFilter: BaseballStat) {
    const labels = data.map(d => d.label);
    const baseData = data.map(d => d.data);

    const chartData = {
      x: labels,
      y: baseData,
      type: 'bar',
      showlegend: false,
      marker: {
        color: '#01579b',
      },
    };

    this.test = [chartData];

    if (statFilter in MlbThresholds.THRESHOLD_MAP) {
      const { excellent, great, avg, poor } = this.statThresholdPoints(data, MlbThresholds.THRESHOLD_MAP[statFilter]);

      this.test.push(
        {
          x: labels,
          y: great,
          type: 'lines',
          name: 'great',
          line: {
            color: StatThresholdColors.great,
            width: 2,
            dash: 'solid',
          },
        },
        {
          x: labels,
          y: avg,
          type: 'lines',
          name: 'Avg',
          line: {
            color: StatThresholdColors.avg,
            width: 2,
            dash: 'solid',
          },
        },
        {
          x: labels,
          y: poor,
          type: 'lines',
          name: 'poor',
          line: {
            color: StatThresholdColors.poor,
            width: 2,
            dash: 'solid',
          },
        }
      );
    }
  }

  private get config() {
    return { responsive: true };
  }

  private get layout() {
    return {
      // margin: { t: 0, r: 0, b: 0, l: 20 },
      // width: '100%',
      // height: 500,
      title: this.title,
      xaxis: {
        title: 'Player',
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

export class ChartNew<T> {
  private _chartData: T[] = [];
  private _config: any;
  private _layout: any;
  private _labels: string[] = [];
  private _type = 'bar';

  constructor({ config, layout, type }) {
    this._config = config;
    this._layout = layout;
    this._type = type;
  }

  get data() {
    return [];
  }

  get chartData(): T[] {
    return this._chartData;
  }

  set chartData(val: T[]) {
    if (this._chartData.length === 0) {
      val.map(d => this._chartData.push(d));
    } else {
      this._chartData.splice(0, this._chartData.length);
      val.map(d => this._chartData.push(d));
    }
  }

  set labels(val: string[]) {
    if (this._labels.length === 0) {
      val.map(d => this._labels.push(d));
    } else {
      this._labels.splice(0, this._labels.length);
      val.map(d => this._labels.push(d));
    }
  }

  get layout() {
    return this._layout;
  }
}

export interface GraphConfig {
  data: GraphData[];
  layout: GraphLayout;
}

export interface GraphData {
  x: any[];
  y: any[];
  type: string;
}

export interface GraphLayout {
  width: number;
  height: number;
  title: string;
}
