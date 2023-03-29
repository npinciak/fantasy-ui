import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { ScatterChartDataset, transformDataToScatterGraph } from '@app/@shared/helpers/graph.helpers';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { benchPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BaseballStat, MLB_LINEUP_MAP, MLB_STATS_MAP } from 'sports-ui-sdk';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamTableRow } from '../models/baseball-team.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';
import { FantasyBaseballEventSelector } from './fantasy-baseball-event.selector';
import { FantasyBaseballLeagueSelector } from './fantasy-baseball-league.selector';

export class FantasyBaseballTeamSelector extends GenericSelector(FantasyBaseballTeamState) {
  @Selector([FantasyBaseballTeamSelector.getList])
  static teamListFilterOptions(teamList: BaseballTeam[]) {
    return teamList.map(t => ({ label: t.name, value: t.id }));
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getById])
  static getTeamInfoByTeamId(teamId: string | null, getTeamById: (id: string) => BaseballTeam) {
    if (!exists(teamId)) throw new Error('cannot retrieve Team without valid teamId');
    return getTeamById(teamId);
  }

  @Selector([FantasyBaseballTeamSelector.getById, FantasyBaseballEventSelector.getById, FantasyBaseballEventSelector.getIdSet])
  static getRosterByTeamId(
    getTeamById: (id: string) => BaseballTeamTableRow,
    getEventById: (id: string) => BaseballEvent,
    gameIdSet: Set<string>
  ): (id: string) => BaseballPlayer[] {
    return (id: string) =>
      getTeamById(id).roster.map(p => {
        const playerGames = p.starterStatusByProGame;

        const playerObj = {} as BaseballPlayer;

        // Object.entries(playerGames).map(([k, g]) => {
        //   if (!gameIdSet.has(k)) return;

        //   playerObj['injuryStatus'] = g;
        //   playerObj[opponent] = getEventById(k).competitors;
        // });

        return { ...p, ...playerObj };
      });
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getCurrentRosterByTeamId(teamId: string | null | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getTeamBatters(teamId: string | null | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters])
  static getTeamStartingBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(batters, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters])
  static getTeamBenchBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(batters, MLB_LINEUP_MAP);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getTeamPitchers(teamId: string | null | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers])
  static getTeamStartingPitchers(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(pitchers, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers])
  static getTeamPitchersBench(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(pitchers, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters, FantasyBaseballLeagueSelector.getSeasonId])
  static getTeamBatterStats(batters: BaseballPlayer[], seasonId: string): (statPeriod: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string) =>
      existsFilter(batters.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId))).sort(
        (a, b) => MLB_LINEUP_MAP[a.lineupSlotId].displayOrder - MLB_LINEUP_MAP[b.lineupSlotId].displayOrder
      );
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatterStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getBatterStatsLineChartData(batters: (statPeriod: string) => BaseballPlayerStatsRow[]) {
    return (statPeriod: string, statFilter: BaseballStat) => {
      const data = batters(statPeriod)
        .map(p => (exists(p.stats) ? p.stats[statFilter] : 0))
        .filter(d => d !== 0)
        .sort((a, b) => b - a);

      const label = batters(statPeriod).map(p => p.name);

      return { label, data };
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatterStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getBatterStatsScatterChartData(
    players: (statPeriod: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => ScatterChartDataset[] {
    return (statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => {
      const xAxisData = players(statPeriod).map(p => p?.stats[xAxisFilter] ?? 0);
      const yAxisData = players(statPeriod).map(p => p?.stats[yAxisFilter] ?? 0);

      const graph = transformDataToScatterGraph({
        data: players(statPeriod),
        xAxisData,
        yAxisData,
        xAxisLabel: MLB_STATS_MAP[xAxisFilter].abbrev,
        yAxisLabel: MLB_STATS_MAP[xAxisFilter].abbrev,
        dataLabels: 'name',
      });

      return graph;
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers, FantasyBaseballLeagueSelector.getSeasonId])
  static getTeamPitcherStats(pitchers: BaseballPlayer[], seasonId: string): (statPeriod: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string) =>
      existsFilter(pitchers.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId)));
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitcherStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getPitcherStatsChartData(
    getTeamPitchers: (teamId: string | null, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string | null, statPeriod: string, statFilter: BaseballStat) => any[] {
    return (teamId: string | null, statPeriod: string, statFilter: BaseballStat) => {
      const pitchers = getTeamPitchers(teamId, statPeriod);
      return pitchers
        .map(p => {
          return {
            data: exists(p.stats) ? p.stats[statFilter] : 0,
            label: p.name,
          };
        })
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitcherStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getPitcherStatsScatterChartData(
    getTeamPitchers: (teamId: string | null, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string | null, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => ScatterChartDataset[] {
    return (teamId: string | null, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => {
      const pitchers = getTeamPitchers(teamId, statPeriod);

      const xAxisData = pitchers.map(p => p?.stats[xAxisFilter] ?? 0);
      const yAxisData = pitchers.map(p => p?.stats[yAxisFilter] ?? 0);

      const graph = transformDataToScatterGraph({
        data: pitchers,
        xAxisData,
        yAxisData,
        xAxisLabel: MLB_STATS_MAP[xAxisFilter].abbrev,
        yAxisLabel: MLB_STATS_MAP[xAxisFilter].abbrev,
        dataLabels: 'name',
      });

      return graph;
    };
  }
}
