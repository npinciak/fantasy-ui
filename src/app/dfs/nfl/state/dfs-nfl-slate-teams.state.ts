import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflSlateTeamDetails } from '../actions/dfs-nfl-slate-team.actions';

@State({ name: DfsNflSlateTeamDetails.stateName })
@Injectable()
export class DfsNflSlateTeamDetailsState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNflSlateTeamDetails,
}) {}
