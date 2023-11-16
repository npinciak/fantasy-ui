import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BASE_CHART_OPTIONS } from '@app/dfs/nfl/helpers/chart-helper/chart-config';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartComponent, StatsChart } from '../base-chart/base-chart.component';

Chart.register(...registerables);
@Component({
  selector: `app-chart-line`,
  template: `
    <div [ngStyle]="{ height }">
      <canvas
        baseChart
        [attr.aria-label]="ariaLabel"
        [type]="'line'"
        [data]="lineChartData"
        [options]="lineChartOptions"
        [legend]="lineChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartLineComponent extends BaseChartComponent<'line'> implements OnChanges {
  chartType = 'line';

  lineChartData: ChartConfiguration<'line'>['data'];

  lineChartOptions: ChartOptions<'line'> = BASE_CHART_OPTIONS;
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
