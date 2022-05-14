import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { MLB_STATS_KEYS, MLB_STATS_MAP } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerBatterStatsRow, BaseballPlayerMap } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

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
  static selectFreeAgentBatterStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerBatterStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
    };
  }

  @Selector([FantasyBaseballFreeAgentsSelector.selectFreeAgentPitcherList])
  static selectFreeAgentPitcherStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerBatterStatsRow[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
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
  playerOwnershipChange: number | null;
  playerOwnershipPercentOwned: number | null;
  stats: EspnClientPlayerStatsEntity | undefined;
};
