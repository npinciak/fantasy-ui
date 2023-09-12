import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartComponent, StatsChart } from '../base-chart/base-chart.component';

Chart.register(...registerables);

@Component({
  selector: `app-chart-scatter`,
  template: `
    <div [ngStyle]="{ height: height }">
      <canvas
        baseChart
        [attr.aria-label]="ariaLabel"
        [type]="'scatter'"
        [data]="scatterChartData"
        [options]="scatterChartOptions"
        [legend]="scatterChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartScatterComponent extends BaseChartComponent implements OnChanges {
  @Input() set xAxisLabel(val: string | null) {
    // this.xAxisLabel = val;
  }
  @Input() set yAxisLabel(val: string | null) {
    // this.yAxisLabel = val;
  }
  scatterChartData: ChartConfiguration<'scatter'>['data'];
  scatterChartOptions: ChartOptions<'scatter'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: this.xAxisLabel ?? '',
        },
      },
      y: {
        title: {
          display: true,
          text: this.yAxisLabel ?? '',
        },
      },
      // y: {
      //   ticks: {
      //     // Include a dollar sign in the ticks
      //     callback: function (value, index, ticks) {
      //       return '$' + value;
      //     },
      //   },
      // },
    },
  };
  scatterChartLegend = false;

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
    if (!exists(graphData)) return;

    if (graphData.data.length === 0) return;
    if (graphData.label.length === 0) return;

    this.scatterChartData = {
      labels: graphData.label,
      datasets: [
        {
          data: graphData.data,
          label: '',
          backgroundColor: ['#1e3a8a'],
          type: 'scatter',
        },
      ],
    };
  }
}
