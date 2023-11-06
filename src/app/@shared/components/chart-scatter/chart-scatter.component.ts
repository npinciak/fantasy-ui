import { Component } from '@angular/core';
import { SCATTER_CHART_OPTIONS } from '@app/dfs/nfl/helpers/chart-helper/chart-config';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartComponent } from '../base-chart/base-chart.component';

Chart.register(...registerables);

@Component({
  selector: `app-chart-scatter`,
  template: `
    <div [ngStyle]="{ height: height }">
      <canvas
        baseChart
        [attr.aria-label]="ariaLabel"
        [type]="'scatter'"
        [data]="chartDataV2"
        [options]="scatterChartOptions"
        [legend]="scatterChartLegend"
      >
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </div>
  `,
})
export class ChartScatterComponent extends BaseChartComponent<'scatter'> {
  scatterChartData: ChartConfiguration<'scatter'>['data'];
  scatterChartOptions: ChartOptions<'scatter'> = SCATTER_CHART_OPTIONS;
  scatterChartLegend = false;
}
