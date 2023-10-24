import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsTeamsActions } from '../actions/dfs-teams.actions';
import { DfsTeamsSelectors } from '../selectors/dfs-teams.selectors';

@Injectable({
  providedIn: 'root',
})
export class DfsTeamsFacade extends GenericFacade({ selectorClass: DfsTeamsSelectors, actionHandler: DfsTeamsActions }) {}
