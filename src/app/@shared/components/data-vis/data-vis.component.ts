import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { pickAxisData } from '@app/@shared/helpers/graph.helpers';
import { MLB_STATS_MAP } from '@app/espn/mlb/consts/stats.const';
import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import { FreeAgentStats } from '@app/espn/mlb/selectors/fantasy-baseball-free-agents.selector';

@Component({
  selector: `app-data-vis`,
  templateUrl: './data-vis.component.html',
  styleUrls: ['./data-vis.component.scss'],
})
export class DataVisComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() chartData: any[];
  @Input() statFilter: Stat = Stat.AB;
  @Input() chartType = 'bar';

  public graph: ChartNew<FreeAgentStats>;
  public test: any;
  readonly MLB_STAT_MAP = MLB_STATS_MAP;

  constructor() {
    this.graph = new ChartNew<FreeAgentStats>({ config: this.config, layout: this.layout, type: 'bar' });
  }

  ngOnInit(): void {
    this.updateChart(this.chartData, this.statFilter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
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

  private updateChart(data: any[], statFilter: Stat) {
    const labels = pickAxisData(data, p => p?.name);
    const chartData = pickAxisData(data, p => p?.stats[statFilter])
      .filter(d => d !== 0)
      .sort((a, b) => b - a);

    this.graph.labels = labels;
    this.graph.chartData = chartData;

    this.test = [
      {
        x: labels,
        y: chartData,
        type: 'bar',
      },
    ];

    switch (statFilter) {
      case Stat.wOBA:
        // {
        //   x: labels,
        //   y: new Array(chartData.length).fill(wOBAThreshold[StatThreshold.excellent]),
        //   type: 'line',
        // },
        // {
        //   x: labels,
        //   y: new Array(chartData.length).fill(wOBAThreshold[StatThreshold.aboveAvg]),
        //   type: 'line',
        // },
        // {
        //   x: labels,
        //   y: new Array(chartData.length).fill(wOBAThreshold[StatThreshold.avg]),
        //   type: 'line',
        // },

        break;

      default:
        break;
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
