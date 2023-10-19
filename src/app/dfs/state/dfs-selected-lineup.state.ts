import { Injectable } from '@angular/core';
import { SelectedState } from '@app/@shared/generic-selected-state/generic-selected-state.m';
import { State } from '@ngxs/store';
import { DfsSelectedLineupActions } from '../actions/dfs-selected-lineup.actions';

@State({ name: DfsSelectedLineupActions.stateName })
@Injectable()
export class DfsSelectedLineupState extends SelectedState({
  selectedActions: DfsSelectedLineupActions,
}) {}
