import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { FootballPlayerFreeAgent } from '../models/football-player.model';
import { FantasyFootballFreeAgentsState } from '../state/fantasy-football-free-agents.state';

export class FantasyFootballFreeAgentsSelectors extends GenericSelector(FantasyFootballFreeAgentsState) {
  @Selector([FantasyFootballFreeAgentsSelectors.getList])
  static getFreeAgents(list: FootballPlayerFreeAgent[]): FootballPlayerFreeAgent[] {
    return list.filter(p => p.teamId !== '0');
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgents])
  static getFreeAgentsStats(players: FootballPlayerFreeAgent[]): (statPeriod: string, seasonId: string) => any[] {
    return (statPeriod: string, seasonId: string) => {
      return players.map(p => {
        const stats = exists(p.stats) ? p.stats[statPeriod] : {};
        return {
          ...p,
          stats,
        };
      });
    };
  }
}
