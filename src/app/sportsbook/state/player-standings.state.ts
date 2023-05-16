import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SportsBookPlayerStandings } from '../actions/player-standings.actions';

@State({ name: SportsBookPlayerStandings.stateName })
@Injectable()
export class SportsBookPlayerStandingsState extends GenericState({
  idProperty: 'standing_type',
  actionHandler: SportsBookPlayerStandings,
}) {}
