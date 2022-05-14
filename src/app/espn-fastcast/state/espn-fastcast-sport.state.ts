import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PatchFastcastSports } from '../actions/espn-fastcast-sport.actions';

@Injectable()
export class EspnFastcastSportState extends GenericState({
  name: 'espnFastcastSports',
  idProperty: 'uid',
  patchAction: PatchFastcastSports,
}) {}
