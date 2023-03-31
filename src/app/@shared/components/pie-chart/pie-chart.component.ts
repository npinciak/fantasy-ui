import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseballStat } from 'sports-ui-sdk';

interface StatsChart {
  data: any[];
  label: any[];
}

Chart.register(...registerables);
@Component({
  selector: `app-pie-chart`,
  template: `<div class="block">
    <canvas baseChart width="300" height="300" [type]="'pie'" [data]="pieChartData" [options]="pieChartOptions" [legend]="pieChartLegend">
    </canvas>
  </div> `,
})
export class PieChartComponent implements OnChanges {
  @Input() title = '';
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() statFilter: BaseballStat = BaseballStat.AB;

  pieChartData: ChartConfiguration<'polarArea'>['data'];
  pieChartOptions: ChartOptions<'polarArea'> = { responsive: true };
  pieChartLegend = false;

  constructor() {}

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

    this.pieChartData = {
      labels: graphData.label,
      datasets: [
        {
          data: graphData.data,
          label: '',
          backgroundColor: ['#0C4A6E', '#075985', '#0369A1', '#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#E0F2FE', '#F0F9FF'],
          type: 'polarArea',
        },
      ],
    };
  }
}
