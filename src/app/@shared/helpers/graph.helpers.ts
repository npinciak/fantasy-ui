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
