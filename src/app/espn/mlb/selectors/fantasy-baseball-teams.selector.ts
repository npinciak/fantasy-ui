import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists } from '@app/@shared/helpers/utils';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastTeamSelectors } from '@app/espn-fastcast/selectors/espn-fastcast-team.selectors';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_LINEUP, MLB_LINEUP_MAP } from '../consts/lineup.const';
import { YearToStatTypePeriod } from '../consts/stats.const';
import { MLB_WEIGHTED_STATS } from '../consts/weighted-stats.const';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeamLive, BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { ChartData } from '../models/chart-data.model';
import { Stat, StatTypePeriodId } from '../models/mlb-stats.model';
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
      [Stat.fip]: advancedStats.fip,
      [Stat.wOBA]: advancedStats.wOBA,
      [Stat.wRAA]: advancedStats.wRAA,
      [Stat.BABIP]: advancedStats.babip,
      [Stat.ISO]: advancedStats.iso,
      [Stat.LOB_PCT]: advancedStats.leftOnBasePercent,
    });

    const stats = {
      ...statsEntity,
      ...adv,
      [Stat.IP]: statsEntity[Stat.IP] * 0.333,
    };
    return {
      name: p.name,
      img: p.img,
      team: p.team,
      position: p.position,
      playerOwnershipChange: p.playerOwnershipChange,
      playerOwnershipPercentOwned: p.playerOwnershipPercentOwned,
      stats,
    };
  }

  static startingPlayersFilter(players: BaseballPlayer[]): BaseballPlayer[] {
    return players
      .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
      .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  static benchPlayersFilter(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
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
              startingStatus: g,
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
    return (id: string) => FantasyBaseballTeamsSelector.startingPlayersFilter(getTeamBatters(id));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters])
  static getTeamBenchBatters(getTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.benchPlayersFilter(getTeamBatters(id));
  }

  @Selector([FantasyBaseballTeamsSelector.getRosterByTeamId])
  static getTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamStartingPitchers(getTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.startingPlayersFilter(getTeamPitchers(id));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers])
  static getTeamPitchersBench(getTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.benchPlayersFilter(getTeamPitchers(id));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatters, FantasyBaseballLeagueState.seasonId])
  static getTeamBatterStats(
    getTeamBatters: (teamId: string) => BaseballPlayer[],
    seasonId: string
  ): (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (id: string, statPeriod: string) =>
      getTeamBatters(id).map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamBatterStats, FantasyBaseballLeagueState.seasonId])
  static getBatterStatsChartData(
    getTeamBatters: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, statFilter: Stat) => ChartData[] {
    return (teamId: string, statPeriod: string, statFilter: Stat) => {
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

  @Selector([FantasyBaseballTeamsSelector.getLiveTeamBatters, EspnFastcastTeamSelectors.getById])
  static getLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    selectFastcastTeamById: (id: string) => FastcastEventTeam | null
  ) {
    return (id: string) => {
      const batters = FantasyBaseballTeamsSelector.startingPlayersFilter(getLiveTeamBatters(id));
      return batters.map(p => {
        const eventUid = selectFastcastTeamById(p?.teamUid)?.eventUid;

        let stats = {};
        if (eventUid) {
          const event = YearToStatTypePeriod(StatTypePeriodId.Live, `${eventUid.split('~')[3].replace('c:', '')}`);
          stats = exists(p.stats) ? p.stats[event] : {};
        }

        return {
          name: p?.name,
          img: p.img,
          team: p.team,
          position: p.position,
          playerOwnershipChange: p.playerOwnershipChange,
          playerOwnershipPercentOwned: p.playerOwnershipPercentOwned,
          stats,
        };
      });
    };
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitchers, FantasyBaseballLeagueState.seasonId])
  static getTeamPitcherStats(
    getTeamPitchers: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerStatsRow[] {
    return (id: string, statPeriod: string) =>
      getTeamPitchers(id).map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
  }

  @Selector([FantasyBaseballTeamsSelector.getTeamPitcherStats, FantasyBaseballLeagueState.seasonId])
  static getPitcherStatsChartData(
    getTeamPitchers: (teamId: string, statPeriod: string) => BaseballPlayerStatsRow[]
  ): (teamId: string, statPeriod: string, statFilter: Stat) => ChartData[] {
    return (teamId: string, statPeriod: string, statFilter: Stat) => {
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
