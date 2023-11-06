import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { DfsFilterSelector } from '@app/dfs/selectors/dfs-filter.selector';
import { Selector } from '@ngxs/store';
import { pickData } from '@sports-ui/ui-sdk';
import { ChartConfiguration } from 'chart.js';
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
  static getPlayerScatterData(data: NflDfsPlayerTableData[], xAxis: string | null, yAxis: string | null) {
    if (xAxis == null || yAxis == null) return [];

    const x: number[] = data.map(p => p[xAxis]);

    const y: number[] = data.map(p => p[yAxis]);

    const lR = linearRegression(x, y);

    const text: string[] = pickData(data, p => p.name);

    const fitFrom = Math.min(...x);
    const fitTo = Math.max(...x);

    const fit = {
      x: [fitFrom, fitTo],
      y: [fitFrom * lR.slope + lR.yIntercept, fitTo * lR.slope + lR.yIntercept],
      text,
      mode: 'lines',
      type: 'scatter',
      name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
    };

    const points = transformScatterGraphData({
      data,
      x,
      y,
      xAxisLabel: xAxis,
      yAxisLabel: yAxis,
      dataLabels: 'name',
      graphType: 'scatter',
    });

    return [{ ...points }, { ...fit }];
  }
}
