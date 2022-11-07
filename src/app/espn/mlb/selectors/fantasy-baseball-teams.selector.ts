import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { linearRegression } from '@app/@shared/helpers/graph.helpers';
import { exists } from '@app/@shared/helpers/utils';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastTeamSelectors } from '@app/espn-fastcast/selectors/espn-fastcast-team.selectors';
import { benchPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_WEIGHTED_STATS } from '../consts/weighted-stats.const';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeamLive, BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { ChartData } from '../models/chart-data.model';
import { EspnBaseballStat } from '../models/mlb-stats.model';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';
import { FantasyBaseballEventsSelector } from './fantasy-baseball-events.selector';
import { FantasyBaseballTeamsLiveSelector } from './fantasy-baseball-teams-live.selector';

export class FantasyBaseballTeamsSelector extends GenericSelector(FantasyBaseballTeamState) {
  static transformToBaseballPlayerBatterStatsRow(p: BaseballPlayer, statPeriod: string, seasonId: string): BaseballPlayerStatsRow {
    const statsEntity = exists(p.stats) ? p.stats[statPeriod] : {};
    const seasonConst = MLB_WEIGHTED_STATS[seasonId];
    const advancedStats = new AdvStats({ seasonConst, statsEntity });

    const adv = {};
    Object.assign(adv, {
      [EspnBaseballStat.fip]: advancedStats.fip,
      [EspnBaseballStat.wOBA]: advancedStats.wOBA,
      [EspnBaseballStat.wRAA]: advancedStats.wRAA,
      [EspnBaseballStat.BABIP]: advancedStats.babip,
      [EspnBaseballStat.ISO]: advancedStats.iso,
      [EspnBaseballStat.LOB_PCT]: advancedStats.leftOnBasePercent,
    });

    const stats = {
      ...statsEntity,
      ...adv,
      [EspnBaseballStat.IP]: statsEntity[EspnBaseballStat.IP] * 0.333,
    };

    return {
      id: p.id,
      name: p.name,
      injured: p.injured,
      injuryStatus: p.injuryStatus,
      img: p.img,
      team: p.team,
      position: p.position,
      lineupSlotId: p.lineupSlotId,
      percentChange: p.percentChange,
      percentOwned: p.percentOwned,
      highlightedPlayer: false,
      stats,
    };
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

  @Selector([FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsLiveSelector.getById])
  static getLiveTeamBatters(getLiveTeamById: (id: string) => BaseballTeamLive): (id: string) => BaseballPlayer[] {
    return (id: string) => getLiveTeamById(id).roster.filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters])
  static getTeamStartingBatters(getTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => any[] {
    return (id: string) => startingPlayersFilter(getTeamBatters(id), MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters])
  static getTeamBenchBatters(getTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => benchPlayersFilter(getTeamBatters(id), MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamStartingPitchers(getTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => startingPlayersFilter(getTeamPitchers(id), MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamPitchersBench(getTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => benchPlayersFilter(getTeamPitchers(id), MLB_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters, FantasyBaseballLeagueState.getSeasonId])
  static getTeamBatterStats(
    getTeamBatters: (teamId: string) => BaseballPlayer[],
    seasonId: string
  ): (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (id: string, statPeriod: string) =>
      getTeamBatters(id)
        .map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId))
        .sort((a, b) => MLB_LINEUP_MAP[a.lineupSlotId].displayOrder - MLB_LINEUP_MAP[b.lineupSlotId].displayOrder);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatterStats, FantasyBaseballLeagueState.getSeasonId])
  static getBatterStatsChartData(
    getTeamBatters: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, statFilter: EspnBaseballStat) => ChartData[] {
    return (teamId: string, statPeriod: string, statFilter: EspnBaseballStat) => {
      const batters = getTeamBatters(teamId, statPeriod);
      return batters
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

  @Selector([FantasyBaseballTeamsSelector.getTeamBatterStats, FantasyBaseballLeagueState.getSeasonId])
  static getBatterStatsScatterChartData(
    getTeamBatters: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, xAxisFilter: EspnBaseballStat, yAxisFilter: EspnBaseballStat) => any {
    return (teamId: string, statPeriod: string, xAxisFilter: EspnBaseballStat, yAxisFilter: EspnBaseballStat) => {
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

  // let trace1 = {

  //   x: [1, 2, 3, 4, 5],

  //   y: [1, 6, 3, 6, 1],

  //   mode: 'markers+text',

  //   type: 'scatter',

  //   name: 'Team A',

  //   text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],

  //   textposition: 'top center',

  //   textfont: {

  //     family:  'Raleway, sans-serif'

  //   },

  //   marker: { size: 12 }

  // };

  @Selector([FantasyBaseballTeamsSelector.getLiveTeamBatters, EspnFastcastTeamSelectors.getById])
  static getLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    selectFastcastTeamById: (id: string) => FastcastEventTeam | null
  ) {
    return (id: string) => {
      const batters = startingBaseballPlayersFilter(getLiveTeamBatters(id), MLB_LINEUP_MAP);
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

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers, FantasyBaseballLeagueState.getSeasonId])
  static getTeamPitcherStats(
    getTeamPitchers: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (id: string, statPeriod: string) =>
      getTeamPitchers(id).map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitcherStats, FantasyBaseballLeagueState.getSeasonId])
  static getPitcherStatsChartData(
    getTeamPitchers: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, statFilter: EspnBaseballStat) => ChartData[] {
    return (teamId: string, statPeriod: string, statFilter: EspnBaseballStat) => {
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

  @Selector([FantasyBaseballTeamsSelector.getTeamPitcherStats, FantasyBaseballLeagueState.getSeasonId])
  static getPitcherStatsScatterChartData(
    getTeamPitchers: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, xAxisFilter: EspnBaseballStat, yAxisFilter: EspnBaseballStat) => any {
    return (teamId: string, statPeriod: string, xAxisFilter: EspnBaseballStat, yAxisFilter: EspnBaseballStat) => {
      const pitchers = getTeamPitchers(teamId, statPeriod);

      const x = pitchers
        .map(p => (exists(p.stats) ? p.stats[xAxisFilter] : 0))
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);
      const y = pitchers
        .map(p => (exists(p.stats) ? p.stats[yAxisFilter] : 0))
        .filter(d => d.data !== 0)
        .sort((a, b) => b.data - a.data);

      const lR = linearRegression(x, y);

      const text = pitchers.map(p => p.name);
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
      };

      return [{ ...points }, { ...fit }];
    };
  }
}
