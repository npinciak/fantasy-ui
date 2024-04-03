import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { BaseballPlayerStatsRow } from '@app/espn-fantasy-baseball/models/baseball-player.model';
import { BaseballStat } from '@sports-ui/ui-sdk';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { SimpleChartConfig } from './chart-helper.model';

export function transformTableDataToBarChartData({
  playerTableData,
  statPeriod,
  stat,
}: {
  playerTableData: BaseballPlayerStatsRow[];
  statPeriod: string;
  stat: BaseballStat;
}): ChartConfiguration['data'] {
  const tableData = playerTableData
    .sort((a, b) => b.stats[stat] - a.stats[stat])
    .reduce(
      (acc, val) => {
        // if (val.position === position && val[stat] > 1 && val != null) {
        acc.labels.push(val.name);
        acc.data.push(val.stats[stat]);
        // }
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
    label: stat.toString(),
    color: '#f43f5e',
    order: 1,
  });

  const labels = tableData.labels;

  return transformToChartConfigurationData(labels, [dataSets]);
}

export function transformTableDataToScatterChartData<TableEntities extends PlayerEntity>(
  data: TableEntities[],
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
