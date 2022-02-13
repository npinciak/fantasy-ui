import { dataSetColor, pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { BaseballPlayer, BaseballPlayerMap } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';

export class FantasyBaseballFreeAgentsSelector {
  @Selector([FantasyBaseballFreeAgentsState.map])
  static selectPlayerList(players: BaseballPlayerMap): BaseballPlayer[] {
    return Object.values(players);
  }

  @Selector([FantasyBaseballFreeAgentsState.map])
  static selectPlayerById(players: BaseballPlayerMap): (id: string) => BaseballPlayer {
    return (id: string) => players[id];
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static selectStatListFilters(players: BaseballPlayer[]) {
    return;
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static freeAgentDynamicLineChartData(playerList: BaseballPlayer[]): (xAxis: string) => ChartData<'line' | 'bar'> {
    return (xAxis: string) => {
      const data = []; // pickAxisData(playerList, obj => obj[xAxis]).sort((a, b) => a - b);
      const labels = playerList.map(p => p.name);
      const dataColor = dataSetColor('#006cd6');

      return {
        labels,
        datasets: [
          {
            data,
            label: xAxis,
            fill: false,
            ...dataColor,
          },
        ],
      };
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static freeAgentDynamicScatterChartData(playerList: BaseballPlayer[]): (xAxis: string, yAxis: string) => ChartData<'scatter'> {
    return (xAxis: string, yAxis: string) => {
      const xaxis = pickAxisData(playerList, obj => obj[xAxis]);
      const yaxis = pickAxisData(playerList, obj => obj[yAxis]);

      const data = scatterData(xaxis, yaxis);
      const labels = playerList.map(p => p.name);
      const dataColor = dataSetColor('#006cd6');

      return {
        labels,
        datasets: [
          {
            data: data,
            label: `${xAxis} / ${yAxis}`,
            pointRadius: 5,
            yAxisID: 'y',
            ...dataColor,
          },
        ],
      };
    };
  }
}
