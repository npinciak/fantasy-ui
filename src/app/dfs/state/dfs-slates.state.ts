import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsSlates } from '../actions/dfs-slates.actions';

@State({ name: DfsSlates.stateName })
@Injectable()
export class DfsSlatesState extends GenericState({
  idProperty: 'importId',
  actionHandler: DfsSlates,
}) {}
