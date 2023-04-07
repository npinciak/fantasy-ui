import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BaseballStat } from 'sports-ui-sdk';

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
  @Input() title = 'Title';
  @Input() subtitle = 'Subtitle';
  @Input() statsMap = {};
  @Input() chartData: StatsChart;
  @Input() statFilter: BaseballStat = BaseballStat.AB;
}
