import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTransactions } from '../actions/fantasy-baseball-transactions.actions';
import { FantasyBaseballTransactionsSelector } from '../selectors/fantasy-baseball-transactions.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTransactionsFacade extends GenericFacade({
  selectorClass: FantasyBaseballTransactionsSelector,
  actionHandler: FantasyBaseballTransactions,
}) {
  getFreeAgentAcquisitionList$ = select(FantasyBaseballTransactionsSelector.getFreeAgentAcquisitionList);
}
