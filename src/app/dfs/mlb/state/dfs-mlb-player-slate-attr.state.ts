import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsMlbSlatePlayer } from '../actions/dfs-mlb-slate-player.actions';

@State({ name: DfsMlbSlatePlayer.stateName })
@Injectable()
export class DailyFantasyMlbPlayerSlateAttributeState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsMlbSlatePlayer,
}) {}
