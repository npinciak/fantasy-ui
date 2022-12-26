import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballEvents } from '../actions/fantasy-football-events.actions';

@State({ name: FantasyFootballEvents.stateName })
@Injectable()
export class FantasyFootballEventsState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyFootballEvents.AddOrUpdate,
  clearAndAdd: FantasyFootballEvents.ClearAndAdd,
}) {}
