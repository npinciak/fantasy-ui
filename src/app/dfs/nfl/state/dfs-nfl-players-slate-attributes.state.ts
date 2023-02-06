import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlatePlayerAttributes } from '../actions/dfs-nfl-slate-player-attributes.actions';

@State({ name: DfsNflSlatePlayerAttributes.stateName })
@Injectable()
export class DfsNflSlatePlayerAttributesState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNflSlatePlayerAttributes,
}) {}
