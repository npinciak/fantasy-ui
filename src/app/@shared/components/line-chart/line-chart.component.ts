import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { BaseballStat, MLB_STATS_MAP } from 'sports-ui-sdk';

@Component({
  selector: `app-data-vis`,
  template: '<canvas #chart width="600" height="200"></canvas>',
})
export class LineChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() title = '';
  @Input() statsMap = {};
  @Input() chartData: any;
  @Input() statFilter: BaseballStat = BaseballStat.AB;

  type = 'bar';

  readonly MLB_STAT_MAP = MLB_STATS_MAP;
  @ViewChild('chart') private chartRef: ElementRef;
  private chart: Chart;
  private data: any[];

  constructor(element: ElementRef, private zone: NgZone) {
    // this.render();

    // this.chartRef = element.nativeElement.getContext('2D');
    // this.data = [
    //   { x: 1, y: 5 },
    //   { x: 2, y: 10 },
    //   { x: 3, y: 6 },
    //   { x: 4, y: 2 },
    //   { x: 4.1, y: 6 },
    // ];
  }

  ngAfterViewInit(): void {
    // this.render();

    // this.chart = new Chart(this.chartRef.nativeElement, {
    //   type: 'line',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'Interesting Data',
    //         data: this.chartData.data,
    //         fill: false,
    //       },
    //     ],
    //     labels: this.chartData.labels,
    //   },
    //   options: {
    //     animation: false,
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //       tooltip: {
    //         enabled: false,
    //       },
    //     },
    //   },
    // });
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      // this.chart = void 0;
    }
  }

  // get labels() {
  //   return this.chartData.label;
  // }

  // get data() {
  //   return {
  //     datasets: [
  //       {
  //         label: 'Interesting Data',
  //         data: this.chartData.data,
  //       },
  //     ],
  //   };
  // }

  ngOnChanges(changes: SimpleChanges): void {
    const propertyNames = Object.getOwnPropertyNames(changes);
    if (propertyNames.every(key => changes[key].isFirstChange())) {
      this.render();
    } else {
      if (this.chart) {
        Object.assign(this.chart.config.data, this.chartConfiguration.data);
      }
      this.update();
    }
    // for (const propName in changes) {
    //   // eslint-disable-next-line no-prototype-builtins
    //   if (changes.hasOwnProperty(propName)) {
    //     switch (propName) {
    //       case 'chartData':
    //         if (!changes.chartData.isFirstChange()) {
    //           this.chartData = changes.chartData.currentValue;
    //           this.updateChart(this.chartData, this.statFilter);
    //         }
    //         break;
    //       case 'statFilter':
    //         this.statFilter = changes.statFilter.currentValue;
    //         this.updateChart(this.chartData, this.statFilter);
    //         break;
    //       case 'title':
    //         this.title = changes.title.currentValue;
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // }
  }

  public update(duration?: any): void {
    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart?.update(duration));
    }
  }

  public render(): Chart {
    if (this.chart) {
      this.chart.destroy();
    }

    return this.zone.runOutsideAngular(() => (this.chart = new Chart(this.chartRef.nativeElement, this.chartConfiguration)));
  }

  private get chartConfiguration() {
    return {
      type: this.type,
      data: this.chartData,
      // options: this.getChartOptions(),
      // plugins: this.plugins,
    };
  }

  // private get chartData(): ChartConfiguration['data'] {
  //   return this.chartData.data;
  //   // ? this.chartData.data
  //   // : {
  //   //     labels: this.chartData.labels || [],
  //   //     datasets: this.datasets || [],
  //   //   };
  // }

  // private statThresholdPoints(data: ChartData[], thresholdByStat: StatByThreshold): StatThresholdByStatThresholdLabel {
  //   const length = data.length;

  //   const map = {} as StatThresholdByStatThresholdLabel;
  //   for (const [x, y] of Object.entries(thresholdByStat)) {
  //     map[StatThresholdLabelByStatThreshold[x]] = Array.from<number>({ length }).fill(thresholdByStat[x]);
  //   }

  //   return map;
  // }

  // private updateChart(data: ChartData[], statFilter: BaseballStat) {
  //   const labels = data.map(d => d.label);
  //   const baseData = data.map(d => d.data);

  //   const chartData = {
  //     x: labels,
  //     y: baseData,
  //     type: 'bar',
  //     showlegend: false,
  //     marker: {
  //       color: '#01579b',
  //     },
  //   };

  //   this.test = [chartData];

  //   if (statFilter in MlbThresholds.THRESHOLD_MAP) {
  //     const { excellent, great, avg, poor } = this.statThresholdPoints(data, MlbThresholds.THRESHOLD_MAP[statFilter]);

  //     this.test.push(
  //       {
  //         x: labels,
  //         y: great,
  //         type: 'lines',
  //         name: 'great',
  //         line: {
  //           color: StatThresholdColors.great,
  //           width: 2,
  //           dash: 'solid',
  //         },
  //       },
  //       {
  //         x: labels,
  //         y: avg,
  //         type: 'lines',
  //         name: 'Avg',
  //         line: {
  //           color: StatThresholdColors.avg,
  //           width: 2,
  //           dash: 'solid',
  //         },
  //       },
  //       {
  //         x: labels,
  //         y: poor,
  //         type: 'lines',
  //         name: 'poor',
  //         line: {
  //           color: StatThresholdColors.poor,
  //           width: 2,
  //           dash: 'solid',
  //         },
  //       }
  //     );
  //   }
  // }
}
