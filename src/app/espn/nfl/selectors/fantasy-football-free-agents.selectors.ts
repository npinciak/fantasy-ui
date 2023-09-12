import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression, transformScatterGraphData } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists, existsFilter, pickData } from '@app/@shared/utilities/utilities.m';
import { NFL_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { FootballPlayerFreeAgent, FootballPlayerStatsRow } from '../models/football-player.model';
import { FantasyFootballFreeAgentsState } from '../state/fantasy-football-free-agents.state';
import { transformToFootballPlayerStatsRow } from '../transformers/fantasy-football.transformers';
import { FantasyFootballFreeAgentFilterSelector } from './fantasy-football-free-agent-filter.selector';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballFreeAgentsSelectors extends GenericSelector(FantasyFootballFreeAgentsState) {
  @Selector([FantasyFootballFreeAgentsSelectors.getList])
  static getFreeAgents(list: FootballPlayerFreeAgent[]): FootballPlayerFreeAgent[] {
    return list.filter(p => p.teamId !== '0');
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgents, FantasyFootballFreeAgentFilterSelector.slices.scoringPeriodId])
  static getFreeAgentsStats(players: FootballPlayerFreeAgent[], scoringPeriodId: string | null) {
    return existsFilter(players.map(p => transformToFootballPlayerStatsRow(p, scoringPeriodId ?? '')));
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats, FantasyFootballFreeAgentsSelectors.getFreeAgentsStats])
  static getCompareTeamAndFreeAgentList(
    getTeamStats: (statPeriodId: string) => FootballPlayerStatsRow[],
    freeAgents: any[]
  ): (teamId: string | null) => FootballPlayerStatsRow[] {
    return (teamId: string | null) => [];
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgentsStats])
  static getFreeAgentsScatter(freeAgents: any[]): (statPeriod: string, xAxis: string | null, yAxis: string | null) => any {
    return (statPeriod: string, xAxis: string | null, yAxis: string | null) => {
      const data = freeAgents;

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
