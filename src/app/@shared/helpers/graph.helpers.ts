import { Stat } from '@app/espn/mlb/models/mlb-stats.model';
import * as d3 from 'd3';

export function pickAxisData<T>(data: T[], getter: (t: T) => number | string | undefined): number[] {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return Number(getter(d));
    }
    return null;
  });
}

export function pickAxisDataNew<T>(data: T[], getter: (t: T) => number | string | undefined): (string | number)[] {
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

export class Chart<T> {
  private _height: number;
  private _width: number;
  private _margin: { top: number; right: number; bottom: number; left: number };

  private _data = [];
  private _domElement: string;
  private _statFilter: Stat;

  constructor(payload: {
    height: number;
    width: number;
    margin: { top: number; right: number; bottom: number; left: number };
    domElement: string;
  }) {
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

  get selectSvg() {
    return this._svg;
  }

  xAxisScaleHorizontalChart(xMax: number) {
    return d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, this._width - this._margin.left]);
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
