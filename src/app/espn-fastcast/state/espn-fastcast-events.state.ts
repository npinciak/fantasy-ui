import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FastcastEvents } from '../actions/espn-fastcast-event.actions';

@State({ name: FastcastEvents.stateName })
@Injectable()
export class EspnFastcastEventsState extends GenericState({
  idProperty: 'uid',
  addOrUpdate: FastcastEvents.AddOrUpdate,
  clearAndAdd: FastcastEvents.ClearAndAdd,
}) {}
