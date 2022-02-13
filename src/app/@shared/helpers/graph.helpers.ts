import { CoreChartOptions, PointPrefixedOptions } from 'chart.js';

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

export function dataSetColor(
  color: string
): Pick<CoreChartOptions<'scatter' | 'line'>, 'borderColor' | 'backgroundColor'> &
  Pick<PointPrefixedOptions, 'pointBackgroundColor' | 'pointBorderColor'> {
  return {
    borderColor: color,
    backgroundColor: color,
    pointBackgroundColor: color,
    pointBorderColor: color,
  };
}

const scaleProperties = {
  display: true,
  title: {
    display: true,
    text: '',
  },
  ticks: {
    color: '',
  },
};

export const scatterChartScales = {
  scales: {
    x: scaleProperties,
    y: scaleProperties,
  },
};
