import { ChartOptions } from 'chart.js';

export const BASE_CHART_OPTIONS: Pick<ChartOptions, 'maintainAspectRatio' | 'responsive'> = {
  maintainAspectRatio: false,
  responsive: true,
};

export const BAR_CHART_OPTIONS: ChartOptions<'bar'> = {
  ...BASE_CHART_OPTIONS,
  indexAxis: 'x',
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

export const SCATTER_CHART_OPTIONS: ChartOptions<'scatter'> = {
  ...BASE_CHART_OPTIONS,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
    },
  },
};
