import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AxisFilter, Chart } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import { FreeAgentStats } from '@app/espn/mlb/selectors/fantasy-baseball-free-agents.selector';
import * as d3 from 'd3';

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

  filterChange(value: any, filterType: AxisFilter) {
    switch (filterType) {
      case AxisFilter.xAxis:
        this.xAxisFilter = value;
        this.chart.statFilter = value;

        this.chart.data = this.chartData
          .filter(d => d.stats[this.chart.statFilter] !== 0 && d.stats[this.chart.statFilter] !== undefined)
          .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter]);

        this.updateData(this.chart);

        break;
      case AxisFilter.yAxis:
        this.yAxisFilter = value;
        break;
      default:
        break;
    }

    this.filterChangeEvent.emit({ xAxis: this.xAxisFilter, yAxis: this.yAxisFilter });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData) {
      if (!changes.chartData.isFirstChange()) {
        this.chart.statFilter = Stat.AB;
        this.chart.data = this.chartData
          .sort((a, b) => b.stats[this.chart.statFilter] - a.stats[this.chart.statFilter])
          .filter(d => d.stats[this.chart.statFilter] !== 0);

        const svg = this.chart.selectSvg;

        const xMax = d3.max(this.chart.data.map(d => d.stats[this.chart.statFilter]));
        // Add X axis
        const x = this.chart.xAxisScaleHorizontalChart(xMax);

        svg
          .append('g')
          .attr('transform', `translate(0,${this.chart.height})`)
          .attr('class', 'xAxis')
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'translate(-10,0) rotate(-45)')
          .style('text-anchor', 'end');

        const y = d3
          .scaleBand()
          .range([0, this.chart.height])
          .domain(this.chart.data.map(d => d.name))
          .padding(0.1);
        svg.append('g').attr('class', 'yAxis').call(d3.axisLeft(y));

        svg
          .selectAll('rect')
          .data(this.chart.data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', x(0))
          .attr('y', d => y(d.name))
          .attr('width', d => x(d.stats[this.chart.statFilter]))
          .attr('height', y.bandwidth())
          .attr('fill', '#69b3a2');
      }
    }
  }

  updateData(chart: Chart<FreeAgentStats>) {
    const svg = d3.select(this.chart.domElement);

    const xMax = d3.max(this.chart.data.map(d => d.stats[this.chart.statFilter]));

    // Add Y axis scale
    const yScale = d3
      .scaleBand()
      .range([0, this.chart.height])
      .domain(this.chart.data.map(d => d.name))
      .padding(0.1);

    // Add X axis scale
    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, this.chart.width - this.chart.margin.left]);

    // create Y axis
    svg.selectAll('.yAxis').remove();

    svg.select('g').append('g').attr('class', 'yAxis').call(d3.axisLeft(yScale));

    svg.selectAll('.xAxis').remove();
    svg
      .select('g')
      .append('g')
      .attr('transform', `translate(0,${this.chart.height})`)
      .attr('class', 'xAxis')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'translate(-10,0) rotate(-45)')
      .style('text-anchor', 'end');

    svg.selectAll('.bar').remove();

    const bars = svg.select('g').selectAll('.bar').data(chart.data);

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr('x', xScale(0))
      .attr('y', d => yScale(d.name))
      .attr('width', d => xScale(d.stats[this.chart.statFilter]))
      .attr('height', yScale.bandwidth())
      .attr('fill', '#69b3a2');
  }

  private get chartConfig() {
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
