import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { exists, existsFilter, pickData } from '@app/@shared/utilities/utilities.m';
import { Selector } from '@ngxs/store';
import { BaseballStat, MLB_STATS_MAP } from 'sports-ui-sdk';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';
import { FantasyBaseballLeagueSelector } from './fantasy-baseball-league.selector';
import { FantasyBaseballTeamSelector } from './fantasy-baseball-team.selector';

export class FantasyBaseballFreeAgentSelector extends GenericSelector(FantasyBaseballFreeAgentsState) {
  @Selector([FantasyBaseballFreeAgentSelector.getList])
  static getFreeAgentBatterList(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentSelector.getList])
  static getFreeAgentPitcherList(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentSelector.getFreeAgentBatterList])
  static getFreeAgentBatterStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return existsFilter(players.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId)));
    };
  }

  @Selector([FantasyBaseballFreeAgentSelector.getFreeAgentBatterStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getFreeAgentBatterScatterChartData(
    getTeamBatters: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, xAxis: BaseballStat | null, yAxis: BaseballStat | null) => any {
    return (teamId: string, statPeriod: string, xAxis: BaseballStat | null, yAxis: BaseballStat | null) => {
      const data = getTeamBatters(teamId, statPeriod);

      if (xAxis == null || yAxis == null) return [];

      const x: number[] = data.map(p => (exists(p.stats) ? p.stats[xAxis] : (0 as number)));
      const y: number[] = data.map(p => (exists(p.stats) ? p.stats[yAxis] : (0 as number)));

      const lR = linearRegression(x, y);

      const text: string[] = pickData(data, p => p.name);

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        text,
        type: 'scatter',
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.slope + lR.yIntercept, fitTo * lR.slope + lR.yIntercept],
        mode: 'lines',
        name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = transformScatterGraphData({
        data,
        x,
        y,
        xAxisLabel: MLB_STATS_MAP[xAxis].abbrev,
        yAxisLabel: MLB_STATS_MAP[yAxis].abbrev,
        dataLabels: 'name',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }

  @Selector([
    FantasyBaseballTeamSelector.getTeamBatterStats,
    FantasyBaseballFreeAgentSelector.getFreeAgentBatterStats,
    FantasyBaseballLeagueSelector.getSeasonId,
  ])
  static getCompareTeamAndFreeAgentBatterList(
    getTeamBatterStatsById: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[],
    getFreeAgentBatterStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[],
    seasonId: string | null
  ): (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentBatterStats(statPeriod, exists(seasonId) ? seasonId : new Date().getFullYear().toString());

      if (!exists(teamId)) return freeAgents;

      const teamBatterStats = getTeamBatterStatsById(teamId, statPeriod).map(b => ({ ...b, highlightedPlayer: true }));

      return [...teamBatterStats, ...freeAgents];
    };
  }

  @Selector([FantasyBaseballFreeAgentSelector.getFreeAgentPitcherList])
  static getFreeAgentPitcherStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return existsFilter(players.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId)));
    };
  }

  @Selector([
    FantasyBaseballTeamSelector.getTeamPitcherStats,
    FantasyBaseballFreeAgentSelector.getFreeAgentPitcherStats,
    FantasyBaseballLeagueSelector.getSeasonId,
  ])
  static getCompareTeamAndFreeAgentPitcherList(
    getTeamPitcherStats: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[],
    getFreeAgentPitcherStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[],
    seasonId: string | null
  ): (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentPitcherStats(statPeriod, exists(seasonId) ? seasonId : new Date().getFullYear().toString());

      if (!exists(teamId)) return freeAgents;

      const teamBatterStats = getTeamPitcherStats(teamId, statPeriod).map(b => ({
        ...b,
        highlightedPlayer: true,
      }));

      return [...teamBatterStats, ...freeAgents];
    };
  }

  @Selector([FantasyBaseballFreeAgentSelector.getCompareTeamAndFreeAgentBatterList])
  static getCompareTeamAndFreeAgentBatterChartData(
    getCompareTeamAndFreeAgentBatterList: (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[]
  ): (teamId: string | null, statPeriod: string) => any[] {
    return (teamId: string | null, statPeriod: string) => [];
    // getCompareTeamAndFreeAgentBatterList(teamId, statPeriod)
    //   .map(p => {
    //     return {
    //       data: exists(p.stats) ? p.stats[statPeriod] : 0,
    //       label: p.name,
    //       color: '#000000',
    //     };
    //   })
    //   .sort((a, b) => b.data - a.data);
  }

  @Selector([FantasyBaseballFreeAgentSelector.getFreeAgentBatterStats])
  static getFreeAgentBatterChartData(
    getFreeAgentBatterStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, seasonId: string, statFilter: BaseballStat) => any[] {
    return (statPeriod: string, seasonId: string, statFilter: BaseballStat) =>
      getFreeAgentBatterStats(statPeriod, seasonId)
        .map(p => {
          return {
            data: exists(p.stats) ? p.stats[statFilter] : 0,
            label: p.name,
          };
        })
        .sort((a, b) => b.data - a.data);
  }

  @Selector([FantasyBaseballFreeAgentSelector.getFreeAgentPitcherStats])
  static getFreeAgentPitcherChartData(
    getFreeAgentPitcherStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, seasonId: string, statFilter: BaseballStat) => any[] {
    return (statPeriod: string, seasonId: string, statFilter: BaseballStat) =>
      getFreeAgentPitcherStats(statPeriod, seasonId)
        .map(p => {
          return {
            data: exists(p.stats) ? p.stats[statFilter] : 0,
            label: p.name,
          };
        })
        .sort((a, b) => b.data - a.data);
  }
}