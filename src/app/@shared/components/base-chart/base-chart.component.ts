import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

export interface StatsChart<T = number> {
  data: T[];
  label: string[];
}

Chart.register(...registerables);

@Component({
  selector: `app-chart-base`,
  template: ``,
})
export class BaseChartComponent<T extends ChartType> {
  @Input() ariaLabel = null;
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() chartDataV2: ChartConfiguration<T>['data'];
  @Input() height = null;
}
