import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfig, updateData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import { FreeAgentStats } from '@app/espn/mlb/selectors/fantasy-baseball-free-agents.selector';

@Component({
  selector: `app-data-vis`,
  template: '<div><div id="myBar"></div></div>',
  styleUrls: ['./data-vis.component.scss'],
})
export class DataVisComponent implements OnInit, OnChanges {
  @Input() chartData: FreeAgentStats[];
  @Input() statFilter: Stat = Stat.AB;
  @Input() xAxisFilterOptions: FilterOptions[];
  @Input() yAxisFilterOptions: FilterOptions[];

  chart: Chart<FreeAgentStats>;

  constructor() {
    this.chart = new Chart<FreeAgentStats>({ ...this.chartConfig });
  }

  ngOnInit(): void {
    this.chart.createSvg();
    this.chart.statFilter = this.statFilter;
    this.chart.data = this.chartData
      .filter(d => d.stats[this.chart.statFilter] !== 0)
      .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter]);

    updateData(this.chart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartData':
            this.chart.statFilter = this.statFilter;
            this.chart.data = this.chartData
              .filter(d => d.stats[this.chart.statFilter] !== 0)
              .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter]);
            updateData(this.chart);
            break;
          case 'statFilter':
            this.chart.statFilter = changes.statFilter.currentValue;
            updateData(this.chart);
            break;
          default:
            break;
        }
      }
    }
  }

  private get chartConfig(): ChartConfig {
    return {
      domElement: '#myBar',
      height: 300,
      width: 800,
      margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 100,
      },
    };
  }
}
