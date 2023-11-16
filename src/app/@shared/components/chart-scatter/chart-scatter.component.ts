import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: `app-chart-scatter`,
  template: `
    <div [ngStyle]="{ height }">
      <canvas
        baseChart
        [attr.aria-label]="ariaLabel"
        [type]="'scatter'"
        [data]="chartDataV2"
        [options]="chartOptions"
        [legend]="scatterChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartScatterComponent extends BaseChartComponent<'scatter'> {
  scatterChartData: ChartConfiguration<'scatter'>['data'];
  scatterChartLegend = false;
}
