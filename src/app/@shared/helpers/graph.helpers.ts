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
