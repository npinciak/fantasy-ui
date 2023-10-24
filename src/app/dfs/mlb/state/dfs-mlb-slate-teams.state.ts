import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsMlbSlateTeamDetailsActions } from '../actions/dfs-mlb-slate-team.actions';

@State({ name: DfsMlbSlateTeamDetailsActions.stateName })
@Injectable()
export class DfsMlbTeamSlateDetailsState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsMlbSlateTeamDetailsActions,
}) {}
