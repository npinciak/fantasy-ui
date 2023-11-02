import { ChartConfiguration, ChartDataset } from 'chart.js';
import { NflDfsPlayerTableData } from '../../models/nfl-player.model';

type PlayerData = {
  label: string[];
  data: (number | null)[];
};

export function transformTableDataToBarChartData(
  playerTableData: NflDfsPlayerTableData[],
  position: string,
  stat: string
): ChartConfiguration['data'] {
  const tableData = playerTableData
    .sort((a, b) => b[stat] - a[stat])
    .reduce(
      (acc, val) => {
        if (val.position === position && val[stat] > 1 && val != null) {
          acc.labels.push(val.name);
          acc.data.push(val[stat]);
        }
        return acc;
      },
      {
        labels: [],
        data: [],
      } as {
        labels: string[];
        data: number[];
      }
    );

  const dataSets = transformToDataSet(tableData.data, {
    type: 'bar',
    label: stat,
    color: '#3b82f6',
    order: 1,
  });

  const labels = tableData.labels;

  return transformToChartConfigurationData(labels, [dataSets]);
}

export function transformToChartConfigurationData(labels: string[], datasets: ChartDataset[]): ChartConfiguration['data'] {
  return {
    labels,
    datasets,
  };
}

export function transformToDataSet(data, config: SimpleChartConfig): ChartDataset {
  const { label, type, color, order } = config;

  return {
    data,
    label,
    borderColor: color,
    backgroundColor: color,
    type,
    order,
  };
}

type SimpleChartConfig = Pick<ChartDataset, 'type' | 'label' | 'order'> & {
  color: string;
};
