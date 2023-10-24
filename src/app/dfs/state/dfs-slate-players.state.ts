import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsSlatePlayersActions } from '../actions/dfs-slate-players.actions';

@State({ name: DfsSlatePlayersActions.stateName })
@Injectable()
export class DfsSlatePlayersState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsSlatePlayersActions,
}) {}
