import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartComponent, StatsChart } from '../base-chart/base-chart.component';

Chart.register(...registerables);
@Component({
  selector: `app-chart-line`,
  template: `
    <app-base-card [title]="title" [subtitle]="subtitle" [height]="height">
      <canvas baseChart [type]="'line'" [data]="lineChartData" [options]="lineChartOptions" [legend]="lineChartLegend"> </canvas>
    </app-base-card>
  `,
})
export class ChartLineComponent extends BaseChartComponent implements OnChanges {
  chartType = 'line';

  lineChartData: ChartConfiguration<'line'>['data'];

  lineChartOptions: ChartOptions<'line'> = { maintainAspectRatio: false, responsive: true };
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

  generateGraph(graphData: StatsChart) {
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
