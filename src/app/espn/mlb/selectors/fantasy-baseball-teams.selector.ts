import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { ScatterChartDataset, transformDataToScatterGraph } from '@app/@shared/helpers/graph.helpers';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastTeamSelectors } from '@app/espn-fastcast/selectors/espn-fastcast-team.selectors';
import { benchPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BaseballStat, MLB_LINEUP_MAP, MLB_STATS_MAP } from 'sports-ui-sdk';
import { AdvStats } from '../class/advStats.class';
import { MLB_WEIGHTED_STATS } from '../consts/weighted-stats.const';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive, BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { ChartData } from '../models/chart-data.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';
import { FantasyBaseballEventsSelector } from './fantasy-baseball-events.selector';
import { FantasyBaseballLeagueSelector } from './fantasy-baseball-league.selector';
import { FantasyBaseballTeamsLiveSelector } from './fantasy-baseball-teams-live.selector';

export class FantasyBaseballTeamsSelector extends GenericSelector(FantasyBaseballTeamState) {
  static transformToBaseballPlayerBatterStatsRow(p: BaseballPlayer, statPeriod: string, seasonId: string): BaseballPlayerStatsRow {
    const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, percentChange, percentOwned } = p;

    const statsEntity = exists(p.stats) ? p.stats[statPeriod] : {};
    const seasonConst = MLB_WEIGHTED_STATS[seasonId];
    const advancedStats = new AdvStats({ seasonConst, statsEntity });

    const adv = {};
    Object.assign(adv, {
      [BaseballStat.fip]: advancedStats.fip,
      [BaseballStat.wOBA]: advancedStats.wOBA,
      [BaseballStat.wRAA]: advancedStats.wRAA,
      [BaseballStat.BABIP]: advancedStats.babip,
      [BaseballStat.ISO]: advancedStats.iso,
      [BaseballStat.LOB_PCT]: advancedStats.leftOnBasePercent,
    });

    const stats = {
      ...statsEntity,
      ...adv,
      [BaseballStat.IP]: statsEntity[BaseballStat.IP] * 0.333,
    };

    return {
      id,
      name,
      injured,
      injuryStatus,
      img,
      team,
      position,
      lineupSlotId,
      percentChange,
      percentOwned,
      highlightedPlayer: false,
      stats,
    };
  }

  @Selector([FantasyBaseballTeamsSelector.getList, FantasyBaseballTeamsLiveSelector.getById])
  static standings(teamList: BaseballTeam[], getById: (id: string | null) => BaseballTeamLive): BaseballTeam[] {
    return teamList
      .map(t => {
        const liveTeam = getById(t.id);
        return {
          ...t,
          liveScore: liveTeam.liveScore,
        };
      })
      .sort((a, b) => b.liveScore - a.liveScore);
  }

  @Selector([FantasyBaseballTeamsSelector.getMap, FantasyBaseballTeamsLiveSelector.getById])
  static getTeamListLive(teams: BaseballTeamMap, liveTeams: (id: string) => BaseballTeamLive): Partial<BaseballTeamLive[]> {
    return Object.values(teams).map(t => {
      const liveTeam = liveTeams(t.id);
      return { ...t, liveTeam };
    });
  }

  @Selector([FantasyBaseballTeamsSelector.getById, FantasyBaseballEventsSelector.getById, FantasyBaseballEventsSelector.getIdSet])
  static getRosterByTeamId(
    getTeamById: (id: string) => BaseballTeamTableRow,
    getEventById: (id: string) => BaseballEvent,
    gameIdSet: Set<string>
  ): (id: string) => BaseballPlayer[] {
    return (id: string) =>
      getTeamById(id).roster.map(p => {
        const playerGames = p.starterStatusByProGame;

        const playerObj = {} as any;

        Object.entries(playerGames).map(([k, g]) => {
          if (gameIdSet.has(k)) {
            Object.assign(playerObj, {
              injuryStatus: g,
              opponent: getEventById(k).competitors,
            });
          }
        });

        return { ...p, ...playerObj };
      });
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getCurrentRosterByTeamId(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getTeamBatters(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => !p.isPitcher) : [];
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamsLiveSelector.getById])
  static getLiveTeamBatters(teamId: string | null, getLiveTeamById: (id: string) => BaseballTeamLive): BaseballPlayer[] {
    return teamId ? getLiveTeamById(teamId).roster.filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters])
  static getTeamStartingBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(batters, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters])
  static getTeamBenchBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(batters, MLB_LINEUP_MAP);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getTeamPitchers(teamId: string | null, selectRosterByTeamId: (id: string) => BaseballPlayer[]): BaseballPlayer[] {
    return teamId ? selectRosterByTeamId(teamId).filter(p => p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamStartingPitchers(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(pitchers, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamPitchersBench(pitchers: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(pitchers, MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters, FantasyBaseballLeagueSelector.getSeasonId])
  static getTeamBatterStats(batters: BaseballPlayer[], seasonId: string): (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (statPeriod: string) =>
      batters
        .map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId))
        .sort((a, b) => MLB_LINEUP_MAP[a.lineupSlotId] - MLB_LINEUP_MAP[b.lineupSlotId].displayOrder);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatterStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getBatterStatsChartData(
    batters: (statPeriod: string) => BaseballPlayerStatsRow[]
  ): (statPeriod: string, statFilter: BaseballStat) => ChartData[] {
    return (statPeriod: string, statFilter: BaseballStat) => {
      return batters(statPeriod)
        .map(p => ({
          data: exists(p.stats) ? p.stats[statFilter] : 0,
          label: p.name,
        }))
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);
    };
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatterStats, FantasyBaseballLeagueSelector.getSeasonId])
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

  @Selector([FantasyBaseballTeamsSelector.getLiveTeamBatters, EspnFastcastTeamSelectors.getById])
  static getLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    selectFastcastTeamById: (id: string) => FastcastEventTeam | null
  ) {
    return (id: string) => {
      const batters = startingPlayersFilter(getLiveTeamBatters(id), MLB_LINEUP_MAP);
      return batters.map(p => {
        const eventUid = selectFastcastTeamById(p?.teamUid)?.eventUid;

        let stats = {};
        if (eventUid) {
          // const event = YearToStatTypePeriod(StatTypePeriodId.Live `${eventUid.split('~')[3].replace('c:', '')}`);
          // stats = exists(p.stats) ? p.stats[event] : {};
        }

        return {
          name: p?.name,
          img: p.img,
          team: p.team,
          position: p.position,
          percentChange: p.percentChange,
          percentOwned: p.percentOwned,
          stats,
        };
      });
    };
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers, FantasyBaseballLeagueSelector.getSeasonId])
  static getTeamPitcherStats(
    getTeamPitchers: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (id: string, statPeriod: string) =>
      getTeamPitchers(id).map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitcherStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getPitcherStatsChartData(
    getTeamPitchers: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, statFilter: BaseballStat) => ChartData[] {
    return (teamId: string, statPeriod: string, statFilter: BaseballStat) => {
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

  @Selector([FantasyBaseballTeamsSelector.getTeamPitcherStats, FantasyBaseballLeagueSelector.getSeasonId])
  static getPitcherStatsScatterChartData(
    getTeamPitchers: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => ScatterChartDataset[] {
    return (teamId: string, statPeriod: string, xAxisFilter: BaseballStat, yAxisFilter: BaseballStat) => {
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
