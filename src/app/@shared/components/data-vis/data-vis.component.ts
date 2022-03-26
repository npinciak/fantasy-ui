import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AxisFilter, Chart, ChartConfig, updateData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import { FreeAgentStats } from '@app/espn/mlb/selectors/fantasy-baseball-free-agents.selector';

@Component({
  selector: `app-data-vis`,
  templateUrl: './data-vis.component.html',
  styleUrls: ['./data-vis.component.scss'],
})
export class DataVisComponent implements OnChanges {
  @Input() chartData: FreeAgentStats[];
  @Input() xAxisFilterOptions: FilterOptions[];
  @Input() yAxisFilterOptions: FilterOptions[];

  @Input() chartType = 'scatter';

  @Output() filterChangeEvent = new EventEmitter<{ xAxis: string; yAxis: string }>();

  readonly AxisFilter = AxisFilter;

  chart = new Chart<FreeAgentStats>({ ...this.chartConfig });

  xAxisFilter: string;
  yAxisFilter: string;

  filterChange(val: MatSelectChange) {
    console.log(val);
  }

  // filterChange(value: any, filterType: AxisFilter) {
  //   switch (filterType) {
  //     case AxisFilter.xAxis:
  //       this.xAxisFilter = value;
  //       this.chart.statFilter = value;

  //       this.chart.data = this.chartData
  //         .filter(d => d.stats[this.chart.statFilter] !== 0 && d.stats[this.chart.statFilter] !== undefined)
  //         .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter]);

  //       updateData(this.chart);

  //       break;
  //     case AxisFilter.yAxis:
  //       this.yAxisFilter = value;
  //       break;
  //     default:
  //       break;
  //   }

  //   this.filterChangeEvent.emit({ xAxis: this.xAxisFilter, yAxis: this.yAxisFilter });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartData':
            if (!changes.chartData.isFirstChange()) {
              this.chart.statFilter = Stat.AB;
              this.chart.data = this.chartData
                .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter])
                .filter(d => d.stats[this.chart.statFilter] !== 0);

              this.chart.createSvg();

              updateData(this.chart);
            }
            break;
          case 'yAxis':
          case 'xAxis':
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
