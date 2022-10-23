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
  static getFreeAgentsStats(players: FootballPlayerFreeAgent[]): (statPeriod: string) => any[] {
    return (statPeriod: string) => {
      return players
        .map(p => {
          const stats = exists(p.stats) ? (exists(p.stats[statPeriod]) ? p.stats[statPeriod] : null) : null;

          return {
            ...p,
            stats,
          };
        })
        .sort((a, b) => {
          const statsB = exists(b.stats) ? (exists(b.stats.appliedTotal) ? b.stats.appliedTotal : 0) : 0;

          const statsA = exists(a.stats) ? (exists(a.stats.appliedTotal) ? a.stats.appliedTotal : 0) : 0;
          return statsB - statsA;
        });
    };
  }
}
