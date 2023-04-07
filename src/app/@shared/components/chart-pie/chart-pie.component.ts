import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartComponent, StatsChart } from '../base-chart/base-chart.component';

Chart.register(...registerables);

@Component({
  selector: `app-chart-pie`,
  template: `
    <app-base-card [title]="title" [subtitle]="subtitle">
      <canvas baseChart [type]="'pie'" [data]="pieChartData" [options]="pieChartOptions" [legend]="pieChartLegend"> </canvas>
    </app-base-card>
  `,
})
export class ChartPieComponent extends BaseChartComponent implements OnChanges {
  pieChartData: ChartConfiguration<'polarArea'>['data'];
  pieChartOptions: ChartOptions<'polarArea'> = { maintainAspectRatio: false, responsive: true };
  pieChartLegend = false;

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
