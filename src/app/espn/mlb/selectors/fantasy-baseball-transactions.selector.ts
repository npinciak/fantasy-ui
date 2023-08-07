import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { LeagueTransaction, TRANSACTION } from '@sports-ui/ui-sdk';
import { BaseballTeam } from '../models/baseball-team.model';
import { FantasyBaseballTransactionsState } from '../state/fantasy-baseball-transactions.state';
import { FantasyBaseballTeamSelector } from './fantasy-baseball-team.selector';

export class FantasyBaseballTransactionsSelector extends GenericSelector(FantasyBaseballTransactionsState) {
  @Selector([FantasyBaseballTransactionsSelector.getList, FantasyBaseballTeamSelector.getById])
  static getFreeAgentAcquisitionList(list: LeagueTransaction[], team: (id: string | null) => BaseballTeam | null): any[] {
    console.log(
      list
        .map(transaction => {
          const teamId = transaction.teamId;
          const teamName = team(teamId.toString())?.name;
          return {
            ...transaction,
            teamId,
            teamName,
          };
        })
        .filter(transaction => transaction.type === TRANSACTION.FreeAgent)
    );
    return list
      .map(transaction => {
        const teamId = transaction.teamId;
        const teamName = team(teamId.toString())?.name;
        return {
          ...transaction,
          teamId,
          teamName,
        };
      })
      .filter(transaction => transaction.type === TRANSACTION.FreeAgent);
  }
}
