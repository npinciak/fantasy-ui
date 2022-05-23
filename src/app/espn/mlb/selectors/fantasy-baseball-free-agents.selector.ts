import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { MLB_STATS_KEYS, MLB_STATS_MAP } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsState } from '../state/fantasy-baseball-free-agents.state';
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

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherList])
  static getFreeAgentPitcherStats(players: BaseballPlayer[]): (statPeriod: string, seasonId: string) => BaseballPlayerStatsRow[] {
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

  @Selector([FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats])
  static getFreeAgentBatterChartData(players: BaseballPlayerStatsRow[]): BaseballPlayerStatsRow[] {
    return players;
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
