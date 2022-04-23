import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_LINEUP, MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_STATS_KEYS, MLB_STATS_MAP, MLB_WEIGHTED_STATS } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerBatterStatsRow } from '../models/baseball-player.model';
import { BaseballTeamLive, BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { Stat } from '../models/mlb-stats.model';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamsSelector {
  @Selector([FantasyBaseballTeamState.map])
  static selectTeamList(teams: BaseballTeamMap): BaseballTeamTableRow[] {
    return Object.values(teams);
  }

  @Selector([FantasyBaseballTeamState.map, FantasyBaseballTeamsLiveState.selectEntityById])
  static selectTeamListLive(teams: BaseballTeamMap, liveTeams: (id: string) => BaseballTeamLive): Partial<BaseballTeamLive[]> {
    return Object.values(teams).map(t => {
      const liveTeam = liveTeams(t.id);
      return { ...t, liveTeam };
    });
  }

  @Selector()
  static selectStatListFilters(): FilterOptions[] {
    return MLB_STATS_KEYS.map(k => {
      return {
        label: MLB_STATS_MAP[k].description,
        value: k,
      };
    });
  }

  @Selector([FantasyBaseballTeamState.map])
  static selectTeamById(teams: BaseballTeamMap): (id: string) => BaseballTeamTableRow {
    return (id: string) => teams[id];
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => BaseballTeamTableRow): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) =>
      selectTeamBatters(id)
        .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
        .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamBattersBench(selectTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers])
  static selectTeamStartingPitchers(selectTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) =>
      selectTeamPitchers(id)
        .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
        .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers])
  static selectTeamPitchersBench(selectTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters, FantasyBaseballLeagueState.seasonId])
  static selectTeamBatterStats(
    selectTeamBatters: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerBatterStatsRow[] {
    return (id: string, statPeriod: string) => {
      const players = selectTeamBatters(id);

      return players.map(p => {
        if (p.stats == null) {
          return;
        }

        const statsEntity = p?.stats[statPeriod];
        const seasonConst = MLB_WEIGHTED_STATS[seasonId];
        const advancedStats = new AdvStats({ seasonConst, statsEntity });

        const adv = {};
        adv[Stat.fip] = advancedStats.fip;
        adv[Stat.wOBA] = advancedStats.wOBA;
        adv[Stat.wRAA] = advancedStats.wRAA;
        adv[Stat.BABIP] = advancedStats.wRAA;
        adv[Stat.ISO] = advancedStats.iso;
        const stats = { ...statsEntity, ...adv };

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

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers, FantasyBaseballLeagueState.seasonId])
  static selectTeamPitcherStats(
    selectTeamPitchers: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerBatterStatsRow[] {
    return (id: string, statPeriod: string) => {
      const players = selectTeamPitchers(id);

      return players.map(p => {
        if (p.stats == null) {
          return;
        }

        const statsEntity = p?.stats[statPeriod];
        const seasonConst = MLB_WEIGHTED_STATS[seasonId];
        const advancedStats = new AdvStats({ seasonConst, statsEntity });

        const adv = {};
        adv[Stat.fip] = advancedStats.fip;
        adv[Stat.wOBA] = advancedStats.wOBA;
        adv[Stat.wRAA] = advancedStats.wRAA;
        adv[Stat.BABIP] = advancedStats.wRAA;
        const stats = { ...statsEntity, ...adv };

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
}
