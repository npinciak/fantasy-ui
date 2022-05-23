import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchFastcastEvents } from '../actions/espn-fastcast-event.actions';

@State({ name: 'espnFastcastEvents' })
@Injectable()
export class EspnFastcastEventState extends GenericState({
  idProperty: 'uid',
  patchAction: PatchFastcastEvents,
}) {}
