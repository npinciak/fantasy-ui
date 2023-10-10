import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlateTeamDetailsActions } from '../actions/dfs-nfl-slate-team.actions';

@State({ name: DfsNflSlateTeamDetailsActions.stateName })
@Injectable()
export class DfsNflSlateTeamDetailsState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNflSlateTeamDetailsActions,
}) {}
