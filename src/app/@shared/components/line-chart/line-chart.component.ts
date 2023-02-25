import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { BaseballStat } from 'sports-ui-sdk';

@Component({
  selector: `app-data-vis`,
  template: '<canvas #chart width="600" height="200"></canvas>',
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @Input() title = '';
  @Input() statsMap = {};
  @Input() chartData: any[];
  @Input() statFilter: BaseballStat = BaseballStat.AB;

  @ViewChild('chart')
  private chartRef: ElementRef;
  private chart: Chart;
  private data: any[];

  constructor() {}

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Interesting Data',
            data: this.chartData,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {},
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData) {
      this.updateChart(changes.chartData.currentValue);
    }
    // this.chart.data = changes.chartData.currentValue;
    // console.log(this.chartData);
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

  updateChart(data: any[]) {
    this.chartData = data;
    console.log(this.chart.data);
  }

 
}
