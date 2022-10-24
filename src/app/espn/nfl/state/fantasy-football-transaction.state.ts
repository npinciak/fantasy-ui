import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import {
  ClearAndAddFantasyFootballTransactions,
  name,
  SetFantasyFootballTransactions,
} from '../actions/fantasy-football-transaction.actions';

@State({ name })
@Injectable()
export class FantasyFootballTransactionState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyFootballTransactions,
  clearAndAdd: ClearAndAddFantasyFootballTransactions,
}) {}
