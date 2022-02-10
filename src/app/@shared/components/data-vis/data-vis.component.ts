import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxisFilter, scatterChartScales } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: `app-data-vis`,
  templateUrl: './data-vis.component.html',
  styleUrls: ['./data-vis.component.scss'],
})
export class DataVisComponent {
  @Input() chartData: ChartData;
  @Input() xAxisFilterOptions: FilterOptions[];
  @Input() yAxisFilterOptions: FilterOptions[];
  @Output() filterChangeEvent = new EventEmitter<{ xAxis: string; yAxis: string }>();

  readonly AxisFilter = AxisFilter;

  readonly scatterChartScales = scatterChartScales;
  readonly scatterChartType: ChartType = 'scatter';

  xAxisFilter: string;
  yAxisFilter: string;

  scatterChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const labelMap = this.chartData.labels.reduce((obj, val, i) => {
              obj[i] = val;
              return obj;
            }, {} as { [i: number]: string });

            return `${labelMap[ctx.dataIndex]} - ${this.xAxisFilter}: ${ctx.parsed.x} / ${this.yAxisFilter}: ${ctx.parsed.y}`;
          },
        },
      },
    },
    ...scatterChartScales,
  };

  filterChange(value: any, filterType: AxisFilter) {
    switch (filterType) {
      case AxisFilter.xAxis:
        this.xAxisFilter = value;
        break;
      case AxisFilter.yAxis:
        this.yAxisFilter = value;
        break;
      default:
        break;
    }
    this.scatterChartOptions.scales.x.title.text = this.xAxisFilter;
    this.scatterChartOptions.scales.y.title.text = this.yAxisFilter;

    this.filterChangeEvent.emit({ xAxis: this.xAxisFilter, yAxis: this.yAxisFilter });
  }
}
