import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists, pickData } from '@app/@shared/utilities/utilities.m';
import { NFL_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { FootballPlayer, FootballPlayerFreeAgent } from '../models/football-player.model';
import { FantasyFootballFreeAgentState } from '../state/fantasy-football-free-agent.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballFreeAgentsSelectors extends GenericSelector(FantasyFootballFreeAgentState) {
  @Selector([FantasyFootballFreeAgentsSelectors.getList])
  static getFreeAgents(list: FootballPlayerFreeAgent[]): FootballPlayerFreeAgent[] {
    return list.filter(p => p.teamId !== '0');
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgents])
  static getFreeAgentsStats(players: FootballPlayerFreeAgent[]): (statPeriod: string) => any[] {
    return (statPeriod: string) => {
      return players
        .map(p => {
          const stats = exists(p.stats) ? (exists(p.stats[statPeriod]) ? p.stats[statPeriod] : null) : null;

          return {
            ...p,
            stats,
          };
        })
        .sort((a, b) => {
          const statsB = exists(b.stats) ? (exists(b.stats.appliedTotal) ? b.stats.appliedTotal : 0) : 0;

          const statsA = exists(a.stats) ? (exists(a.stats.appliedTotal) ? a.stats.appliedTotal : 0) : 0;
          return statsB - statsA;
        });
    };
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats, FantasyFootballFreeAgentsSelectors.getFreeAgentsStats])
  static getCompareTeamAndFreeAgentList(
    getTeamStats: (statPeriodId: string) => FootballPlayer[],
    getFreeAgentsStats: (statPeriod: string) => any[]
  ): (teamId: string | null, statPeriod: string) => FootballPlayer[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentsStats(statPeriod);

      if (exists(teamId)) {
        const teamStats = getTeamStats(statPeriod).map(b => ({ ...b, highlightedPlayer: true }));

        return [...teamStats, ...freeAgents];
      }

      return freeAgents;
    };
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgentsStats])
  static getFreeAgentsScatter(
    players: (statPeriod: string) => any[]
  ): (statPeriod: string, xAxis: string | null, yAxis: string | null) => any {
    return (statPeriod: string, xAxis: string | null, yAxis: string | null) => {
      const data = players(statPeriod);

      if (xAxis == null || yAxis == null) return [];

      const x: number[] = data.map(p => (exists(p.stats) ? p.stats.stats[xAxis] : (0 as number)));

      const y: number[] = data.map(p => (exists(p.stats) ? p.stats.stats[yAxis] : (0 as number)));

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
        xAxisLabel: NFL_STATS_MAP[Number(xAxis)].abbrev,
        yAxisLabel: NFL_STATS_MAP[Number(yAxis)].abbrev,
        dataLabels: 'name',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }
}
