import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlatePlayerAttributesActions } from '../actions/dfs-nfl-slate-player-attributes.actions';

@State({ name: DfsNflSlatePlayerAttributesActions.stateName })
@Injectable()
export class DfsNflSlatePlayerAttributesState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNflSlatePlayerAttributesActions,
}) {}
