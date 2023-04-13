import { Injectable } from '@angular/core';
import { GenericFacade } from '../generic-state/generic.facade';
import { FangraphsConstants } from './fangraphs-const.actions';
import { FangraphsConstantsSelector } from './fangraphs-const.selector';

@Injectable({ providedIn: 'root' })
export class FangraphsConstantsFacade extends GenericFacade({
  selectorClass: FangraphsConstantsSelector,
  actionHandler: FangraphsConstants,
}) {}
