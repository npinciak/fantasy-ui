export function pickAxisData<T>(data: T[], getter: (t: T) => number | string | undefined): number[] {
  return data.map(d => {
    if (getter(d) !== undefined) {
      return Number(getter(d));
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
