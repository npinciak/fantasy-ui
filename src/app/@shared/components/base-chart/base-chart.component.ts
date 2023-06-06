import { Component, Input } from '@angular/core';
import { BaseballStat } from '@sports-ui/ui-sdk/espn';
import { Chart, registerables } from 'chart.js';

export interface StatsChart {
  data: number[];
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
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() statFilter: BaseballStat = BaseballStat.AB;
  @Input() height = null;
}
