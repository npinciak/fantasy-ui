export function pickAxisData<T>(data: T[], getter: (t: T) => number | string): number[] {
  return data.map(d => Number(getter(d)));
}

export function scatterData(xAxisData: number[], yAxisData: number[]): { x: number; y: number }[] {
  return xAxisData.map((data, i) => {
    return {
      x: data,
      y: yAxisData[i],
    };
  });
}
