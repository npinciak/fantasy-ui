import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballEvent } from '../actions/fantasy-football-event.actions';

@State({ name: FantasyFootballEvent.stateName })
@Injectable()
export class FantasyFootballEventState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballEvent,
}) {}
