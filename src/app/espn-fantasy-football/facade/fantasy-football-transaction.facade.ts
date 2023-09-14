import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyFootballTransaction } from '../actions/fantasy-football-transaction.actions';
import { FantasyFootballTransactionSelectors } from '../selectors/fantasy-football-transaction.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballTransactionFacade extends GenericFacade({
  selectorClass: FantasyFootballTransactionSelectors,
  actionHandler: FantasyFootballTransaction,
}) {
  transactionList$ = select(FantasyFootballTransactionSelectors.getCommunicationsList);
}
