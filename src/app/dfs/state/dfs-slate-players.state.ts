import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsSlatePlayers } from '../actions/dfs-slate-players.actions';

@State({ name: DfsSlatePlayers.stateName })
@Injectable()
export class DfsSlatePlayersState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsSlatePlayers,
}) {}
