import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsMatchups } from '../actions/dfs-matchups.actions';

@State({ name: DfsMatchups.stateName })
@Injectable()
export class DfsMatchupsState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsMatchups,
}) {}
