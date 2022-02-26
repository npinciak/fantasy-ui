import { dataSetColor, pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { AdvStats } from '../class/advStats.class';
import { MLB_STATS_KEYS, MLB_STATS_MAP, MLB_WEIGHTED_STATS_2021 } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerMap } from '../models/baseball-player.model';
import { Stat } from '../models/mlb-stats.model';
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
  static selectFreeAgentBatterList(players: BaseballPlayer[]): BaseballPlayer[] {
    return Object.values(players).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static selectFreeAgentPitcherList(players: BaseballPlayer[]): BaseballPlayer[] {
    return Object.values(players).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static selectFreeAgentStats(players: BaseballPlayer[]): (statPeriod: string) => { name: string; stats: EspnClientPlayerStatsEntity }[] {
    return (statPeriod: string) => {
      return players.map(p => {
        if (p.stats == null) {
          return;
        }

        const playerStats = p?.stats[Number(statPeriod)];
        const advancedStats = new AdvStats(playerStats);
        advancedStats.seasonConst = MLB_WEIGHTED_STATS_2021;

        const adv = {};
        adv[Stat.fip] = advancedStats.fip;
        adv[Stat.wOBA] = advancedStats.wOBA;
        adv[Stat.wRAA] = advancedStats.wRAA;
        adv[Stat.BABIP] = advancedStats.wRAA;
        const stats = { ...playerStats, ...adv };
        return {
          name: p?.name,
          stats,
        };
      });
    };
  }

  @Selector()
  static selectStatListFilters(): FilterOptions[] {
    return MLB_STATS_KEYS.map(k => {
      return {
        label: MLB_STATS_MAP[k].description,
        value: k,
      };
    });
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectFreeAgentStats])
  static freeAgentDynamicLineChartData(
    selectFreeAgentStats: (statPeriod: string) => { name: string; stats: EspnClientPlayerStatsEntity }[]
  ): (xAxis: string, statPeriod: string) => ChartData<'line' | 'bar'> {
    return (xAxis: string, statPeriod: string) => {
      const stats = selectFreeAgentStats(statPeriod).filter(p => p?.stats != undefined);
      const data = pickAxisData(stats, obj => obj.stats[xAxis]).sort((a, b) => a - b);
      const labels = stats.map(p => p.name);
      const dataColor = dataSetColor('#006cd6');

      return {
        labels,
        datasets: [
          {
            data,
            label: MLB_STATS_MAP[xAxis].abbrev,
            fill: false,
            ...dataColor,
          },
        ],
      };
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectFreeAgentStats])
  static freeAgentDynamicScatterChartData(
    selectFreeAgentStats: (statPeriod: string) => { name: string; stats: EspnClientPlayerStatsEntity }[]
  ): (xAxis: string, yAxis: string, statPeriod: string) => ChartData<'scatter'> {
    return (xAxis: string, yAxis: string, statPeriod: string) => {
      const stats = selectFreeAgentStats(statPeriod).filter(p => p?.stats != undefined);

      const xaxis = pickAxisData(stats, obj => obj.stats[xAxis]);
      const yaxis = pickAxisData(stats, obj => obj.stats[yAxis]);

      const data = scatterData(xaxis, yaxis);
      const labels = stats.map(p => p.name);
      const dataColor = dataSetColor('#006cd6');

      return {
        labels,
        datasets: [
          {
            data: data,
            label: `${MLB_STATS_MAP[xAxis].abbrev} / ${MLB_STATS_MAP[yAxis].abbrev}`,
            pointRadius: 5,
            yAxisID: 'y',
            ...dataColor,
          },
        ],
      };
    };
  }
}
