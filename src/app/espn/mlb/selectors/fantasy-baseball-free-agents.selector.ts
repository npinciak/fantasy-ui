import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression } from '@app/@shared/helpers/graph.helpers';
import { exists } from '@app/@shared/helpers/utils';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@ngxs/store';
import { BaseballStat, MLB_STATS_KEYS, MLB_STATS_MAP } from 'sports-ui-sdk';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { ChartData } from '../models/chart-data.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

export class FantasyBaseballFreeAgentsSelector extends GenericSelector(FantasyBaseballFreeAgentsState) {
  @Selector([FantasyBaseballFreeAgentsSelector.getList])
  static getFreeAgentBatterList(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.getList])
  static getFreeAgentPitcherList(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentBatterList])
  static getFreeAgentBatterStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats, FantasyBaseballLeagueState.getSeasonId])
  static getFreeAgentBatterScatterChartData(
    getTeamBatters: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => any {
    return (teamId: string, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => {
      const batters = getTeamBatters(teamId, statPeriod);

      const x = batters
        .map(p => (exists(p.stats) ? p.stats[xAxisFilter] : 0))
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);
      const y = batters
        .map(p => (exists(p.stats) ? p.stats[yAxisFilter] : 0))
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);

      const lR = linearRegression(x, y);

      const text = batters.map(p => p.name);
      const type = 'scatter';

      const fitFrom = Math.min(...x);
      const fitTo = Math.max(...x);

      const fit = {
        x: [fitFrom, fitTo],
        y: [fitFrom * lR.sl + lR.off, fitTo * lR.sl + lR.off],
        text,
        mode: 'lines',
        type: 'scatter',
        name: 'R2='.concat((Math.round(lR.r2 * 10000) / 10000).toString()),
      };

      const points = {
        x,
        y,
        text,
        type,
        mode: 'markers+text',
        textfont: {
          family: 'Roboto',
        },
        textposition: 'top center',
        marker: { size: 12 },
        color: [],
      };

      return [{ ...points }, { ...fit }];
    };
  }

  @Selector([
    FantasyBaseballTeamsSelector.getTeamBatterStats,
    FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats,
    FantasyBaseballLeagueState.getSeasonId,
  ])
  static getCompareTeamAndFreeAgentBatterList(
    getTeamBatterStatsById: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[],
    getFreeAgentBatterStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[],
    seasonId: string | null
  ): (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentBatterStats(statPeriod, exists(seasonId) ? seasonId : new Date().getFullYear().toString());

      if (exists(teamId)) {
        const teamBatterStats = getTeamBatterStatsById(teamId, statPeriod).map(b => ({ ...b, highlightedPlayer: true }));

        return [...teamBatterStats, ...freeAgents];
      }

      return freeAgents;
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherList])
  static getFreeAgentPitcherStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
    };
  }

  @Selector([
    FantasyBaseballTeamsSelector.getTeamPitcherStats,
    FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherStats,
    FantasyBaseballLeagueState.getSeasonId,
  ])
  static getCompareTeamAndFreeAgentPitcherList(
    getTeamPitcherStats: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[],
    getFreeAgentPitcherStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[],
    seasonId: string | null
  ): (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[] {
    return (teamId: string | null, statPeriod: string) => {
      const freeAgents = getFreeAgentPitcherStats(statPeriod, exists(seasonId) ? seasonId : new Date().getFullYear().toString());

      if (exists(teamId)) {
        const teamBatterStats = getTeamPitcherStats(teamId, statPeriod).map(b => {
          return { ...b, highlightedPlayer: true };
        });

        return [...teamBatterStats, ...freeAgents];
      }
      return freeAgents;
    };
  }

  @Selector()
  static selectStatListFilters(): FilterOptions<string>[] {
    return MLB_STATS_KEYS.map(k => ({ label: MLB_STATS_MAP[k].description, value: k }));
  }

  @Selector([FantasyBaseballFreeAgentsSelector.getCompareTeamAndFreeAgentBatterList])
  static getCompareTeamAndFreeAgentBatterChartData(
    getCompareTeamAndFreeAgentBatterList: (teamId: string | null, statPeriod: string) => (BaseballPlayer | BaseballPlayerStatsRow)[]
  ): (teamId: string | null, statPeriod: string) => ChartData[] {
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

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats])
  static getFreeAgentBatterChartData(
    getFreeAgentBatterStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, seasonId: string, statFilter: BaseballStat) => ChartData[] {
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

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherStats])
  static getFreeAgentPitcherChartData(
    getFreeAgentPitcherStats: (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, seasonId: string, statFilter: BaseballStat) => ChartData[] {
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
