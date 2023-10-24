import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlatePlayerDetailsActions } from '../actions/dfs-nfl-slate-player-details.actions';

@State({ name: DfsNflSlatePlayerDetailsActions.stateName })
@Injectable()
export class DfsNflSlatePlayerDetailsState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNflSlatePlayerDetailsActions,
}) {}
