import { PropertyOfType } from '../generic-state/generic.state';

export function pickAxisData<T>(data: T[], getter: (t: T) => any): T[] | null {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return getter(d);
    }
    return null;
  });
}

export function pickData<T, U>(data: T[], getter: (t: T) => any): U[] {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return getter(d);
    }
    return [];
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

export function transformGraphData<T, P extends PropertyOfType<T, string | number>>(
  data: T[],
  opts: { x: number[]; y: number[]; xAxisLabel: string; yAxisLabel: string; labels: P; graphType?: 'scatter' }
) {
  const text: string[] = pickData(data, d => d[opts.labels]) as string[];

  return {
    x: opts.x,
    y: opts.y,
    text,
    type: opts.graphType,
    mode: 'markers',
    textfont: {
      family: 'Roboto',
    },
    textposition: 'top center',
    marker: { size: 12 },
    hovertemplate: `
    <b>${opts.yAxisLabel}</b>: %{y}
    <br>
    <b>${opts.xAxisLabel}</b>: %{x}
    <br>
    <b>%{text}</b>`,
  };
}

export function linearRegression(x: number[], y: number[]) {
  let lr: Regression = { sl: 0, off: 0, r2: 0 };
  const n = y.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  for (let i = 0; i < y.length; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
    sumYY += y[i] * y[i];
  }

  // prettier-ignore
  lr.sl = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  // prettier-ignore
  lr.off = (sumY - lr.sl * sumX) / n;
  // prettier-ignore
  lr.r2 = Math.pow((n * sumXY - sumX * sumY) / Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY)), 2);

  return lr;
}

type LinearRegressionAttr = 'sl' | 'off' | 'r2';
type Regression = { [key in LinearRegressionAttr]: number };
