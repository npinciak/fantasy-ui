import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNbaSlatePlayer } from '../actions/dfs-nba-slate-player.actions';

@State({ name: DfsNbaSlatePlayer.stateName })
@Injectable()
export class DfsNbaSlatePlayerState extends GenericState({
  idProperty: 'id',
  addOrUpdate: DfsNbaSlatePlayer.AddOrUpdate,
  clearAndAdd: DfsNbaSlatePlayer.ClearAndAdd,
}) {}
