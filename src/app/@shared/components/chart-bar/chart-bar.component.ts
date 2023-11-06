import { Component, Input } from '@angular/core';
import { BAR_CHART_OPTIONS } from '@app/dfs/nfl/helpers/chart-helper/chart-config';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartComponent } from '../base-chart/base-chart.component';

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
export class ChartBarComponent extends BaseChartComponent<'bar'> {
  @Input() horizontalLabels = true;

  barChartData: ChartConfiguration<'bar'>['data'];
  chartType = 'bar';
  lineChartLegend = true;

  barChartOptions: ChartOptions<'bar'> = {
    ...BAR_CHART_OPTIONS,
    indexAxis: this.horizontalLabels ? 'x' : 'y',
  };
}
