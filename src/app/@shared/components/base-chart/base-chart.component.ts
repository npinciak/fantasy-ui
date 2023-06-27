import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

export interface StatsChart<T = number> {
  data: T[];
  label: string[];
}

Chart.register(...registerables);

@Component({
  selector: `app-chart-base`,
  template: ``,
})
export class BaseChartComponent {
  @Input() title = null;
  @Input() subtitle = null;
  @Input() ariaLabel = null;
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() height = null;
}
