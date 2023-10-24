import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsTeamsActions } from '../actions/dfs-teams.actions';

@State({ name: DfsTeamsActions.stateName })
@Injectable()
export class DfsTeamsState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsTeamsActions,
}) {}
