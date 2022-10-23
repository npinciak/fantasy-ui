import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddFastcastSports, SetFastcastSports } from '../actions/espn-fastcast-sport.actions';

@State({ name: 'espnFastcastSports' })
@Injectable()
export class EspnFastcastSportState extends GenericState({
  idProperty: 'uid',
  addOrUpdate: SetFastcastSports,
  clearAndAdd: ClearAndAddFastcastSports,
}) {}
