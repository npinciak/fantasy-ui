import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FastcastTeams } from '../actions/espn-fastcast-team.actions';
import { EspnFastcastTeamSelectors } from '../selectors/espn-fastcast-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class FastcastTeamFacade extends GenericFacade({
  selectorClass: EspnFastcastTeamSelectors,
  actionHandler: FastcastTeams,
}) {}
