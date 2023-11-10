import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FastcastSports } from '../actions/espn-fastcast-sport.actions';
import { EspnFastcastSportSelectors } from '../selectors/espn-fastcast-sport.selectors';

@Injectable({
  providedIn: 'root',
})
export class FastcastSportFacade extends GenericFacade({
  selectorClass: EspnFastcastSportSelectors,
  actionHandler: FastcastSports,
}) {}
