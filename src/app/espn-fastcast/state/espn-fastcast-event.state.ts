import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PatchFastcastEvents } from '../actions/espn-fastcast-event.actions';

@Injectable()
export class EspnFastcastEventState extends GenericState({
  name: 'espnFastcastEvents',
  idProperty: 'uid',
  patchAction: PatchFastcastEvents,
}) {}
