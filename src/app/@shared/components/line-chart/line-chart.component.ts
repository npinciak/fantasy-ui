import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseballStat } from 'sports-ui-sdk';

interface StatsChart {
  data: any[];
  label: any[];
}

Chart.register(...registerables);
@Component({
  selector: `app-line-chart`,
  template: `<div class="block">
    <canvas
      baseChart
      width="600"
      height="400"
      [type]="'line'"
      [data]="lineChartData"
      [options]="lineChartOptions"
      [legend]="lineChartLegend"
    >
    </canvas>
  </div> `,
})
export class LineChartComponent implements OnChanges {
  @Input() title = '';
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() statFilter: BaseballStat = BaseballStat.AB;

  constructor() {}

  lineChartData: ChartConfiguration<'line'>['data'];

  lineChartOptions: ChartOptions<'line'> = { responsive: true };
  lineChartLegend = false;

  ngOnChanges(changes: SimpleChanges): void {
    const requireRender = ['type'];
    const propertyNames = Object.getOwnPropertyNames(changes);

    if (propertyNames.some(key => requireRender.includes(key)) || propertyNames.every(key => changes[key].isFirstChange())) {
      this.generateGraph(this.chartData);
    } else {
      this.generateGraph(changes.chartData.currentValue);
    }
  }

  generateGraph<T>(graphData: StatsChart) {
    if (graphData.data.length === 0) return;
    if (graphData.label.length === 0) return;

    this.lineChartData = {
      labels: graphData.label,
      datasets: [
        {
          data: graphData.data,
          label: '',
          fill: true,
          tension: 0.5,
          borderColor: '#0284c7',
          backgroundColor: '#bae6fd',
          type: 'line',
        },
      ],
    };
  }
}
