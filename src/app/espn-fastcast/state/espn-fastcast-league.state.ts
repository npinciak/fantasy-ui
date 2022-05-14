import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PatchFastcastLeague } from '../actions/espn-fastcast-league.actions';

@Injectable()
export class EspnFastcastLeagueState extends GenericState({
  name: 'espnFastcastLeagues',
  idProperty: 'uid',
  patchAction: PatchFastcastLeague,
}) {}
