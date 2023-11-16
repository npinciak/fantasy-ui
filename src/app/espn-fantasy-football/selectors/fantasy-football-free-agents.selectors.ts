import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { existsFilter } from '@sports-ui/ui-sdk/helpers';
import { FootballPlayerFreeAgent, FootballPlayerStatsRow } from '../models/football-player.model';
import { FantasyFootballFreeAgentsState } from '../state/fantasy-football-free-agents.state';
import { transformToFootballPlayerStatsRow } from '../transformers/fantasy-football.transformers';
import { FantasyFootballFreeAgentsFilterSelector } from './fantasy-football-free-agents-filter.selector';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballFreeAgentsSelectors extends GenericSelector(FantasyFootballFreeAgentsState) {
  @Selector([FantasyFootballFreeAgentsSelectors.getList])
  static getFreeAgents(list: FootballPlayerFreeAgent[]): FootballPlayerFreeAgent[] {
    return list.filter(p => p.teamId !== '0');
  }

  @Selector([FantasyFootballFreeAgentsSelectors.getFreeAgents, FantasyFootballFreeAgentsFilterSelector.slices.selectedScoringPeriodIds])
  static getFreeAgentsStats(players: FootballPlayerFreeAgent[], scoringPeriodId: { [id: string]: boolean }) {
    return existsFilter(players.map(p => transformToFootballPlayerStatsRow(p, '')));
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats, FantasyFootballFreeAgentsSelectors.getFreeAgentsStats])
  static getCompareTeamAndFreeAgentList(
    getTeamStats: (statPeriodId: string) => FootballPlayerStatsRow[],
    freeAgents: any[]
  ): (teamId: string | null) => FootballPlayerStatsRow[] {
    return (teamId: string | null) => [];
  }
}
