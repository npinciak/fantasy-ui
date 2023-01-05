import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlatePlayer } from '../actions/dfs-nfl-slate-player.actions';

@State({ name: DfsNflSlatePlayer.stateName })
@Injectable()
export class DfsNflSlatePlayerState extends GenericState({
  idProperty: 'id',
  addOrUpdate: DfsNflSlatePlayer.AddOrUpdate,
  clearAndAdd: DfsNflSlatePlayer.ClearAndAdd,
}) {}
