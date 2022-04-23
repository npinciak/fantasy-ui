import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_STATS_KEYS, MLB_STATS_MAP, MLB_WEIGHTED_STATS } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerMap } from '../models/baseball-player.model';
import { Stat } from '../models/mlb-stats.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';

export class FantasyBaseballFreeAgentsSelector {
  @Selector([FantasyBaseballFreeAgentsState.map])
  static selectPlayerList(players: BaseballPlayerMap): BaseballPlayer[] {
    return Object.values(players);
  }

  @Selector([FantasyBaseballFreeAgentsState.map])
  static selectPlayerById(players: BaseballPlayerMap): (id: string) => BaseballPlayer {
    return (id: string) => players[id];
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static selectFreeAgentBatterList(players: BaseballPlayer[]): BaseballPlayer[] {
    return Object.values(players).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectPlayerList])
  static selectFreeAgentPitcherList(players: BaseballPlayer[]): BaseballPlayer[] {
    return Object.values(players).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectFreeAgentBatterList])
  static selectFreeAgentBatterStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => FreeAgentStats[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => {
        if (p?.stats == null) {
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
          img: p?.img,
          team: p?.team,
          position: p?.position,
          playerOwnershipChange: p?.playerOwnershipChange,
          playerOwnershipPercentOwned: p?.playerOwnershipPercentOwned,
          stats,
        };
      });
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectFreeAgentPitcherList])
  static selectFreeAgentPitcherStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => FreeAgentStats[] {
    return (statPeriod: string, seasonId: string) => {
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

  @Selector()
  static selectStatListFilters(): FilterOptions[] {
    return MLB_STATS_KEYS.map(k => {
      return {
        label: MLB_STATS_MAP[k].description,
        value: k,
      };
    });
  }
}

export type FreeAgentStats = {
  name: string;
  img: string;
  team: string;
  position: string;
  playerOwnershipChange: number;
  playerOwnershipPercentOwned: number;
  stats: EspnClientPlayerStatsEntity;
};
