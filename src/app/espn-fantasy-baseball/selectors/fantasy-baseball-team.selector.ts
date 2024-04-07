import { RouterSelector } from '@app/@core/router/router.selectors';
import { FangraphsConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { FangraphsConstantsSelector } from '@app/@shared/fangraphs/fangraphs-const.selector';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { transformTableDataToBarChartData } from '@app/@shared/helpers/chart-helper';
import {
  benchPlayersFilter,
  injuredPlayersFilter,
  sortPlayersByLineupSlotDisplayOrder,
  startingPlayersFilter,
} from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BASEBALL_LINEUP_MAP, BaseballStat, PLAYER_INJURY_STATUS } from '@sports-ui/ui-sdk/espn';
import { exists, existsFilter } from '@sports-ui/ui-sdk/helpers';
import { ChartConfiguration } from 'chart.js';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamTableRow } from '../models/baseball-team.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';
import { FantasyBaseballEventsSelector } from './fantasy-baseball-events.selector';
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

  @Selector([FantasyBaseballTeamSelector.getById, FantasyBaseballEventsSelector.getById, FantasyBaseballEventsSelector.getIdSet])
  static getRosterByTeamId(
    getTeamById: (id: string) => BaseballTeamTableRow,
    getEventById: (id: string) => BaseballEvent,
    gameIdSet: Set<string>
  ): (id: string) => BaseballPlayer[] {
    return (id: string) =>
      getTeamById(id).roster.map(p => {
        const playerGames = p.starterStatusByProGame;

        const playerObj = {} as BaseballPlayer;

        if (playerGames == null) {
          playerObj['injuryStatus'] = PLAYER_INJURY_STATUS.Active;
          return { ...p, ...playerObj };
        }

        Object.entries(playerGames).map(([k, g]) => {
          if (!gameIdSet.has(k)) return;

          playerObj['injuryStatus'] = g;
          // playerObj[opponent] = getEventById(k).competitors;
        });

        return { ...p, ...playerObj };
      });
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getCurrentRosterByTeamId(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getTeamBatters(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters])
  static getTeamStartingBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(batters, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters])
  static getTeamBenchBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(batters, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters])
  static getTeamInjuredReserveBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return injuredPlayersFilter(batters);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamSelector.getRosterByTeamId])
  static getTeamPitchers(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers])
  static getTeamStartingPitchers(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(pitchers, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers])
  static getTeamBenchPitchers(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(pitchers, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitchers])
  static getTeamInjuredReservePitchers(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return injuredPlayersFilter(pitchers);
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatters, FantasyBaseballLeagueSelector.slices.seasonId, FangraphsConstantsSelector.getById])
  static getTeamBatterStats(
    batters: BaseballPlayer[],
    seasonId: string,
    getSeasonConsts: (id: string | null) => FangraphsConstants
  ): (statPeriod: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string) => {
      const seasonConst = getSeasonConsts(seasonId);

      const playerList = existsFilter(
        batters.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonConst))
      );

      return sortPlayersByLineupSlotDisplayOrder(playerList, BASEBALL_LINEUP_MAP);
    };
  }

  @Selector([
    FantasyBaseballTeamSelector.getRosterByTeamId,
    FantasyBaseballLeagueSelector.slices.seasonId,
    FangraphsConstantsSelector.getById,
  ])
  static getBatterStatsByTeamId(
    selectRosterByTeamId: (teamId: string) => BaseballPlayer[],
    seasonId: string,
    getSeasonConsts: (id: string | null) => FangraphsConstants
  ) {
    return (teamId: string, statPeriod: string) => {
      const seasonConst = getSeasonConsts(seasonId);

      const playerList = existsFilter(
        selectRosterByTeamId(teamId)
          .filter(p => !p.isPitcher)
          .map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonConst))
      );

      return sortPlayersByLineupSlotDisplayOrder(playerList, BASEBALL_LINEUP_MAP);
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatterStats])
  static getBatterStatsLineChartData(
    batters: (statPeriod: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, statFilter: BaseballStat) => ChartConfiguration['data'] {
    return (statPeriod: string, statFilter: BaseballStat) => {
      const playerTableData = batters(statPeriod);

      const barChartData = transformTableDataToBarChartData({ playerTableData, statPeriod: 'QB', stat: statFilter });

      return {
        ...barChartData,
        datasets: [...barChartData.datasets],
      };
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamBatterStats, FantasyBaseballLeagueSelector.slices.seasonId])
  static getBatterStatsScatterChartData(players: (statPeriod: string) => BaseballPlayerStatsRow[]) {
    return (statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => {
      return {
        data: players(statPeriod).map(p => ({
          x: p.stats[xAxisFilter] ?? 0,
          y: p.stats[yAxisFilter] ?? 0,
        })),
        label: [''],
      };
    };
  }

  @Selector([
    FantasyBaseballTeamSelector.getTeamPitchers,
    FantasyBaseballLeagueSelector.slices.seasonId,
    FangraphsConstantsSelector.getById,
  ])
  static getTeamPitcherStats(
    getTeamPitchers: BaseballPlayer[],
    seasonId: string,
    getSeasonConsts: (id: string | null) => FangraphsConstants
  ): (statPeriod: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string) => {
      const seasonConst = getSeasonConsts(seasonId);

      const playerList = existsFilter(
        getTeamPitchers.map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonConst))
      );
      return sortPlayersByLineupSlotDisplayOrder(playerList, BASEBALL_LINEUP_MAP);
    };
  }

  @Selector([
    FantasyBaseballTeamSelector.getRosterByTeamId,
    FantasyBaseballLeagueSelector.slices.seasonId,
    FangraphsConstantsSelector.getById,
  ])
  static getPitcherStatsByTeamId(
    selectRosterByTeamId: (id: string) => BaseballPlayer[],
    seasonId: string,
    getSeasonConsts: (id: string | null) => FangraphsConstants
  ): (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (teamId: string, statPeriod: string) => {
      const seasonConst = getSeasonConsts(seasonId);

      const playerList = existsFilter(
        selectRosterByTeamId(teamId)
          .filter(p => p.isPitcher)
          .map(p => FantasyBaseballTransformers.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonConst))
      );

      return sortPlayersByLineupSlotDisplayOrder(playerList, BASEBALL_LINEUP_MAP);
    };
  }

  @Selector([FantasyBaseballTeamSelector.getTeamPitcherStats, FantasyBaseballLeagueSelector.slices.seasonId])
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
}
