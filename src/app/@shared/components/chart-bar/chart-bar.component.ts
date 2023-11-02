import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { exists } from '@sports-ui/ui-sdk/helpers';
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
        [data]="chartDataV2"
        [options]="barChartOptions"
        [legend]="lineChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartBarComponent extends BaseChartComponent<'bar'> implements OnChanges {
  @Input() horizontalLabels = true;

  barChartData: ChartConfiguration<'bar'>['data'];
  chartType = 'bar';
  lineChartLegend = true;

  ngOnChanges(changes: SimpleChanges): void {
    const requireRender = ['type'];
    const propertyNames = Object.getOwnPropertyNames(changes);

    if (propertyNames.some(key => requireRender.includes(key)) || propertyNames.every(key => changes[key].isFirstChange())) {
      this.generateGraph(this.chartData);
    } else {
      this.generateGraph(changes.chartData.currentValue);
    }
  }

  get barChartOptions(): ChartOptions<'bar'> {
    return {
      maintainAspectRatio: false,
      responsive: true,
      indexAxis: this.horizontalLabels ? 'x' : 'y',
      interaction: {
        intersect: false,
        mode: 'index',
      },
    };
  }

  generateGraph(graphData: StatsChart | undefined) {
    if (!exists(graphData) || !exists(graphData.data) || !exists(graphData.label))
      return {
        labels: [],
        datasets: [
          {
            data: [],
            label: '',
            borderColor: '#0284c7',
            backgroundColor: '#bae6fd',
            type: 'bar',
          },
        ],
      };

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
