import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SetFastcastEvents } from '../actions/espn-fastcast-event.actions';

@State({ name: 'espnFastcastEvents' })
@Injectable()
export class EspnFastcastEventsState extends GenericState({
  idProperty: 'uid',
  addOrUpdate: SetFastcastEvents,
}) {}
