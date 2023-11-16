import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballTransactions } from '../actions/fantasy-baseball-transactions.actions';

@State({ name: FantasyBaseballTransactions.stateName })
@Injectable()
export class FantasyBaseballTransactionsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballTransactions,
}) {}
