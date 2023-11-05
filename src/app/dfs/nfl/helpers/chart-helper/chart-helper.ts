import { ChartConfiguration, ChartDataset } from 'chart.js';
import { NflDfsPlayerTableData } from '../../models/nfl-player.model';
import { SimpleChartConfig } from './chart-helper.model';

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
    color: '#cbd5e1',
    order: 1,
  });

  const labels = tableData.labels;

  return transformToChartConfigurationData(labels, [dataSets]);
}

export function transformTableDataToScatterChartData(
  data: NflDfsPlayerTableData[],
  { xChartAxis, yChartAxis }
): ChartConfiguration['data'] {
  const points: { x: number; y: number }[] = data.reduce((acc, val) => {
    if (val[xChartAxis] > 1 && val[yChartAxis] > 1) {
      acc.push({
        x: val[xChartAxis] as number,
        y: val[yChartAxis] as number,
      });
    }
    return acc;
  }, [] as { x: number; y: number }[]);

  const dataSets = transformToDataSet(points, {
    type: 'scatter',
    label: 'scatter',
    color: '#f43f5e',
    order: 1,
  });

  return transformToChartConfigurationData([], [dataSets]);
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
