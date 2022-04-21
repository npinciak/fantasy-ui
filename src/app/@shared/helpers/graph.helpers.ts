import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import { FreeAgentStats } from '@app/espn/mlb/selectors/fantasy-baseball-free-agents.selector';
import * as d3 from 'd3';

export function pickAxisDataOLD<T>(data: T[], getter: (t: T) => number | string | undefined): number[] {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return Number(getter(d));
    }
    return null;
  });
}

export function pickAxisData<T, U>(data: T[], getter: (t: T) => U): U[] | null {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return getter(d);
    }
    return null;
  });
}

export function scatterData(xAxisData: number[], yAxisData: number[]): { x: number | null; y: number | null }[] {
  return xAxisData.map((data, i) => {
    return {
      x: data,
      y: yAxisData[i],
    };
  });
}

export enum AxisFilter {
  xAxis,
  yAxis,
}

export interface ChartConfig {
  domElement: string;
  height: number;
  width: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export class Chart<T> {
  private _height: number;
  private _width: number;
  private _margin: { top: number; right: number; bottom: number; left: number };

  private _data = [];
  private _domElement: string;
  private _statFilter: Stat;

  constructor(payload: ChartConfig) {
    this._height = payload.height;
    this._width = payload.width;
    this._margin = payload.margin;
    this._domElement = payload.domElement;
  }

  get data(): T[] {
    return this._data;
  }

  set data(val: T[]) {
    if (this._data.length === 0) {
      val.map(d => this._data.push(d));
    } else {
      this._data.splice(0, this._data.length);
      val.map(d => this._data.push(d));
    }
  }

  get statFilter() {
    return this._statFilter;
  }

  set statFilter(val: Stat) {
    this._statFilter = val;
  }

  get domElement() {
    return this._domElement;
  }

  get margin() {
    return this._margin;
  }

  get svgHeight() {
    return this._svgHeight;
  }

  get svgWidth() {
    return this._svgWidth;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  createSvg() {
    return this._svg;
  }

  xAxisScaleHorizontalChart(xMax: number) {
    return d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._margin.left]);
  }

  yScale(data: string[]) {
    return d3.scaleBand().range([0, this._height]).domain(data).padding(0.1);
  }

  get toolTips() {
    return this._toolTips;
  }

  private get _toolTips() {
    const svg = d3.select(this._domElement);
    const tip = svg.select('g').append('g');

    return tip;
  }

  private get _svg() {
    return d3
      .select(this._domElement)
      .append('svg')
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .append('g')
      .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);
  }

  private get _svgHeight() {
    return this._height + this._margin.top + this._margin.bottom;
  }

  private get _svgWidth() {
    return this._width + this._margin.left + this._margin.right;
  }
}

export function updateData(chart: Chart<FreeAgentStats>) {
  const svg = d3.select(chart.domElement);

  const xAxisData = pickAxisData(chart.data, d => d.stats[chart.statFilter]);
  const xMax = d3.max(xAxisData);
  const xScale = chart.xAxisScaleHorizontalChart(xMax);

  const yAxisData = pickAxisData(chart.data, d => d.name);
  const yScale = chart.yScale(yAxisData);

  // create Y axis
  svg.selectAll('.yAxis').remove();
  svg.select('g').append('g').attr('class', 'yAxis').call(d3.axisLeft(yScale));
  svg.selectAll('.xAxis').remove();
  svg
    .select('g')
    .append('g')
    .attr('transform', `translate(0,${chart.height})`)
    .attr('class', 'xAxis')
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'translate(-10,0) rotate(-45)')
    .style('text-anchor', 'end');

  svg.selectAll('.bar').remove();

  const tips = chart.toolTips;

  const mouseover = function (d) {
    tips.style('opacity', 1);
    d3.select(this).style('stroke', 'black'); //opacity', 1);
  };

  const mousemove = function (d) {
    d3.select(this)
      .text(`The exact value of<br>this cell is`)
      .style('left', d3.pointer(this)[0] + 70 + 'px')
      .style('top', d3.pointer(this)[1] + 'px');
  };
  const mouseleave = function (d) {
    // tips.style('opacity', 0);
    d3.select(this).style('stroke', 'none');
    // .style('opacity', 0.8);
  };

  const bars = svg.select('g').selectAll('.bar').data(chart.data);

  bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr('x', xScale(0))
    .attr('y', d => yScale(d.name))
    .attr('width', d => xScale(d.stats[chart.statFilter]))
    .attr('height', yScale.bandwidth())
    .attr('fill', '#69b3a2');

  svg
    .select('g')
    .selectAll('.bar')
    .append('title')
    .text((d: FreeAgentStats) => `${d.name} ${d.stats[chart.statFilter]}`)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseleave);
}
