import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchFantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';

@State({ name: 'fantasyBaseballEvents' })
@Injectable()
export class FantasyBaseballEventsState extends GenericState({ idProperty: 'id', patchAction: PatchFantasyBaseballEvents }) {}
