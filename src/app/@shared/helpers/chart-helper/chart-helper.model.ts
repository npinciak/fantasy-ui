import { ChartDataset } from 'chart.js';

export type SimpleChartConfig = Pick<ChartDataset, 'type' | 'label' | 'order'> & {
  color: string;
};
