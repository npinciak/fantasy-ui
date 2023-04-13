import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FangraphsConstants } from './fangraphs-const.actions';

@State({ name: FangraphsConstants.stateName })
@Injectable()
export class FangraphsConstantsState extends GenericState({
  idProperty: 'season',
  actionHandler: FangraphsConstants,
}) {}
