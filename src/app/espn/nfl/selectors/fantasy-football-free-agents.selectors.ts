import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, pickData, transformGraphData } from '@app/@shared/helpers/graph.helpers';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { NFL_STATS_MAP } from 'sports-ui-sdk';
import { FootballPlayer, FootballPlayerFreeAgent } from '../models/football-player.model';
import { FantasyFootballFreeAgentsState } from '../state/fantasy-football-free-agents.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballFreeAgentsSelectors extends GenericSelector(FantasyFootballFreeAgentsState) {
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
    getTeamStats: (id: string | null, statPeriodId: string) => FootballPlayer[],
    getFreeAgentsStats: (statPeriod: string) => any[]
  ): (teamId: string | null, statPeriod: string) => FootballPlayer[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentsStats(statPeriod);

      if (exists(teamId)) {
        const teamStats = getTeamStats(teamId, statPeriod).map(b => ({ ...b, highlightedPlayer: true }));

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
      const list = players(statPeriod);

      if (xAxis == null || yAxis == null) {
        return [];
      }

      const x: number[] = list.map(p => (exists(p.stats) ? p.stats.stats[xAxis] : (0 as number)));

      const y: number[] = list.map(p => (exists(p.stats) ? p.stats.stats[yAxis] : (0 as number)));

      const lR = linearRegression(x, y);

      const text: string[] = pickData(list, p => p.name);

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.sl + lR.off, fitTo * lR.sl + lR.off],
        text,
        mode: 'lines',
        type: 'scatter',
        // name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = transformGraphData(list, {
        x,
        y,
        xAxisLabel: NFL_STATS_MAP[Number(xAxis)].abbrev,
        yAxisLabel: NFL_STATS_MAP[Number(yAxis)].abbrev,
        labels: 'name',
        graphType: 'scatter',
      });

      return [{ ...points }, { ...fit }];
    };
  }

  // @Selector([DailyFantasyNflPlayerSelectors.getPlayerTableData])
  // static getPlayerScatterData(players: NflDfsPlayerTableData[]): (xAxis: string | null, yAxis: string | null) => any {
  //   return (xAxis: string | null, yAxis: string | null) => {
  //     if (xAxis == null || yAxis == null) {
  //       return [];
  //     }

  //     const x: number[] = players.map(p => p[xAxis]);

  //     const y: number[] = players.map(p => p[yAxis]);

  //     const lR = linearRegression(x, y);

  //     const text: string[] = pickData(players, p => p.name);

  //     const fitFrom = Math.min(...x);
  //     const fitTo = Math.max(...x);

  //     const fit = {
  //       x: [fitFrom, fitTo],
  //       y: [fitFrom * lR.sl + lR.off, fitTo * lR.sl + lR.off],
  //       text,
  //       mode: 'lines',
  //       type: 'scatter',
  //       // name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
  //     };

  //     const points = transformGraphData(players, { xAxis, yAxis, labels: 'name', graphType: 'scatter' });

  //     return [{ ...points }, { ...fit }];
  //   };
  // }
}
