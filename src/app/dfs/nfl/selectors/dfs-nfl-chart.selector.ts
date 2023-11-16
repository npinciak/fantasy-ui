import { DfsFilterSelector } from '@app/dfs/selectors/dfs-filter.selector';
import { Selector } from '@ngxs/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SCATTER_CHART_OPTIONS } from '../helpers/chart-helper/chart-config';
import {
  transformTableDataToBarChartData,
  transformTableDataToScatterChartData,
  transformToDataSet,
} from '../helpers/chart-helper/chart-helper';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';
import { DfsNflPlayerSelectors } from './dfs-nfl-players.selectors';

export class DfsNflChartSelector {
  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsFilterSelector.slices.position, DfsFilterSelector.slices.xChartAxis])
  static getPlayerBarChartDataByStatAndPosition(
    playerTableData: NflDfsPlayerTableData[],
    position: string | null,
    stat: string | null
  ): ChartConfiguration['data'] {
    const barChartData = transformTableDataToBarChartData(playerTableData, position ?? 'QB', stat ?? 'fpts');

    const targetGpp = [] as number[];
    const targetCash = [] as number[];
    const targetValueDiffGpp = [] as number[];

    playerTableData.forEach(p => {
      if (p.valueTargetGPPs != null && p.position === position) targetGpp.push(p.valueTargetGPPs);
      if (p.valueTargetCash != null && p.position === position) targetCash.push(p.valueTargetCash);
      if (p.targetValueDiffGPPs != null && p.position === position) targetValueDiffGpp.push(p.targetValueDiffGPPs);
    });

    const targetValueGppDiffLineData = transformToDataSet(targetValueDiffGpp, {
      type: 'line',
      label: 'targetValueDiffGpp',
      color: '#f43f5e',
      order: 0,
    });

    const targetValueGppLineData = transformToDataSet(targetGpp, {
      type: 'line',
      label: 'Target Value GPP',
      color: '#84cc16',
      order: 0,
    });

    const targetValueCashLineData = transformToDataSet(targetCash, {
      type: 'line',
      label: 'Target Value Cash',
      color: '#84cc16',
      order: 0,
    });

    return {
      ...barChartData,
      datasets: [...barChartData.datasets, targetValueGppLineData, targetValueGppDiffLineData],
    };
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsFilterSelector.slices.xChartAxis, DfsFilterSelector.slices.yChartAxis])
  static getPlayerScatterChartDataByStat(
    data: NflDfsPlayerTableData[],
    xAxis: string | null,
    yAxis: string | null
  ): ChartConfiguration['data'] {
    return transformTableDataToScatterChartData(data, { xChartAxis: xAxis, yChartAxis: yAxis });
  }

  @Selector([DfsNflPlayerSelectors.getPlayerTableData, DfsFilterSelector.slices.xChartAxis, DfsFilterSelector.slices.yChartAxis])
  static getPlayerScatterChartOptions(data: NflDfsPlayerTableData[], xAxis: string | null, yAxis: string | null): ChartOptions<'scatter'> {
    return {
      ...SCATTER_CHART_OPTIONS,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => {
              const { label, formattedValue } = ctx;

              return `${yAxis}: ${formattedValue}, ${xAxis}: ${label}`;
            },
          },
        },
      },
    };
  }
}
