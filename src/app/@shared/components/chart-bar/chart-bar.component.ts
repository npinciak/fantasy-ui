import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartComponent, StatsChart } from '../base-chart/base-chart.component';

@Component({
  selector: `app-chart-bar`,
  template: `
    <div [ngStyle]="{ height: height }">
      <canvas
        baseChart
        [attr.aria-label]="ariaLabel"
        [type]="chartType"
        [data]="barChartData"
        [options]="barChartOptions"
        [legend]="lineChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartBarComponent extends BaseChartComponent implements OnChanges {
  chartType = 'bar';

  barChartData: ChartConfiguration<'bar'>['data'];

  barChartOptions: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y',
  };

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

    this.barChartData = {
      labels: graphData.label,
      datasets: [
        {
          data: graphData.data,
          label: '',
          borderColor: '#0284c7',
          backgroundColor: '#bae6fd',
          type: 'bar',
        },
      ],
    };
  }
}
