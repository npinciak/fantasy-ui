import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflGridIronActions } from '../actions/dfs-nfl-grid-iron.actions';

@State({ name: DfsNflGridIronActions.stateName })
@Injectable()
export class DfsNflGridIronState extends GenericState({
  idProperty: 'playerId',
  actionHandler: DfsNflGridIronActions,
}) {}
