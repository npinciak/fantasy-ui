export function pickAxisData<T>(data: T[], getter: (t: T) => any): T[] | null {
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

export function linearRegression(x: number[], y: number[]) {
  let lr: Regression = {
    sl: 0,
    off: 0,
    r2: 0,
  };
  let n = y.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let sum_yy = 0;

  for (let i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_xx += x[i] * x[i];
    sum_yy += y[i] * y[i];
  }

  // prettier-ignore
  lr.sl = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  // prettier-ignore
  lr.off = (sum_y - lr.sl * sum_x) / n;
  // prettier-ignore
  lr.r2 = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

  return lr;
}

type LinearRegressionAttr = 'sl' | 'off' | 'r2';
type Regression = { [key in LinearRegressionAttr]: number };
