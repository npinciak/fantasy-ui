import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';

@State({ name: FantasyBaseballEvents.stateName })
@Injectable()
export class FantasyBaseballEventsState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyBaseballEvents.AddOrUpdate,
  clearAndAdd: FantasyBaseballEvents.ClearAndAdd,
}) {}
