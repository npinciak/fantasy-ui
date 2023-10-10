import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsSlatesActions } from '../actions/dfs-slates.actions';

@State({ name: DfsSlatesActions.stateName })
@Injectable()
export class DfsSlatesState extends GenericState({
  idProperty: 'importId',
  actionHandler: DfsSlatesActions,
}) {}
