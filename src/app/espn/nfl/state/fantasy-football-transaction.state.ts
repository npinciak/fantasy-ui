import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballTransaction } from '../actions/fantasy-football-transaction.actions';

@State({ name: FantasyFootballTransaction.stateName })
@Injectable()
export class FantasyFootballTransactionState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyFootballTransaction.AddOrUpdate,
  clearAndAdd: FantasyFootballTransaction.ClearAndAdd,
}) {}
