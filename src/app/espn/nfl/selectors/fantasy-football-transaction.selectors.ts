import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnClient } from 'sports-ui-sdk';
import { FootballPlayerFreeAgent } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballTransactionState } from '../state/fantasy-football-transaction.state';
import { FantasyFootballFreeAgentsSelectors } from './fantasy-football-free-agents.selectors';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballTransactionSelectors extends GenericSelector(FantasyFootballTransactionState) {
  @Selector([FantasyFootballTransactionSelectors.getList, FantasyFootballTeamSelectors.getById, FantasyFootballFreeAgentsSelectors.getById])
  static getCommunicationsList(
    list: EspnClient.LeagueTransaction[],
    getTeamById: (id: string | null) => FootballTeam | null,
    getFreeAgentById: (id: string | null) => FootballPlayerFreeAgent | null
  ) {
    return list.map(l => {
      const team = getTeamById(l.teamId.toString()) ?? null;

      const items = l.items?.map(i => ({
        ...i,
        player: getFreeAgentById(i.playerId.toString()),
      }));
      return {
        l,
        items,
        team,
      };
    });
  }
}
